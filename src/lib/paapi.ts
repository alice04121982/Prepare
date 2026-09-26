import "server-only";
import { createHash, createHmac } from "node:crypto";
import { unstable_cache } from "next/cache";
import { products } from "@/data/products";
import { AMAZON_TAG, type Offers } from "@/lib/amazon";

/**
 * Live Amazon prices and photos through the Product Advertising API 5.0.
 *
 * Off until the keys are set. Amazon issues them once the Associates account
 * has three qualifying sales in 180 days; paste them into the Vercel project
 * as AMAZON_PAAPI_ACCESS_KEY and AMAZON_PAAPI_SECRET_KEY (server only, never
 * NEXT_PUBLIC_, never committed) and redeploy. With no keys, or on any error,
 * this returns nothing and the site shows product names and links only,
 * which the Associates agreement allows without the API.
 *
 * Only ASINs from products.ts are ever sent, so no visitor input reaches
 * Amazon, and there is no public endpoint to abuse. Results are cached for
 * an hour: Amazon requires prices shown to be refreshed within 24 hours and
 * shown with the time they were fetched.
 */


const HOST = "webservices.amazon.co.uk";
const REGION = "eu-west-1";
const PATH = "/paapi5/getitems";
const TARGET = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems";
const ASIN = /^[A-Z0-9]{10}$/;

export function paapiEnabled() {
  return Boolean(process.env.AMAZON_PAAPI_ACCESS_KEY && process.env.AMAZON_PAAPI_SECRET_KEY);
}

const sha256 = (s: string) => createHash("sha256").update(s, "utf8").digest("hex");
const hmac = (key: Buffer | string, s: string) => createHmac("sha256", key).update(s, "utf8").digest();

/** AWS Signature Version 4 headers for one GetItems request. */
function signedHeaders(body: string, accessKey: string, secretKey: string, now: Date) {
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const day = amzDate.slice(0, 8);
  const headers: Record<string, string> = {
    "content-encoding": "amz-1.0",
    "content-type": "application/json; charset=utf-8",
    host: HOST,
    "x-amz-date": amzDate,
    "x-amz-target": TARGET,
  };
  const names = Object.keys(headers).sort();
  const canonical = [
    "POST",
    PATH,
    "",
    names.map((n) => `${n}:${headers[n]}\n`).join(""),
    names.join(";"),
    sha256(body),
  ].join("\n");
  const scope = `${day}/${REGION}/ProductAdvertisingAPI/aws4_request`;
  const toSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256(canonical)].join("\n");
  const key = hmac(hmac(hmac(hmac(`AWS4${secretKey}`, day), REGION), "ProductAdvertisingAPI"), "aws4_request");
  const signature = createHmac("sha256", key).update(toSign, "utf8").digest("hex");
  // Host is signed but set by fetch itself, so it is not passed on.
  const sent = Object.fromEntries(Object.entries(headers).filter(([n]) => n !== "host"));
  return {
    ...sent,
    authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=${names.join(";")}, Signature=${signature}`,
  };
}

type GetItemsResponse = {
  ItemsResult?: {
    Items?: {
      ASIN: string;
      Images?: { Primary?: { Medium?: { URL?: string } } };
      Offers?: { Listings?: { Price?: { DisplayAmount?: string } }[] };
    }[];
  };
};

async function fetchOffers(): Promise<Offers> {
  const accessKey = process.env.AMAZON_PAAPI_ACCESS_KEY;
  const secretKey = process.env.AMAZON_PAAPI_SECRET_KEY;
  if (!accessKey || !secretKey) return {};

  const asins = [...new Set(products.map((p) => p.asin))].filter((a) => ASIN.test(a));
  const offers: Offers = {};
  // GetItems takes ten ASINs a call; new accounts get one call a second.
  for (let i = 0; i < asins.length; i += 10) {
    const body = JSON.stringify({
      ItemIds: asins.slice(i, i + 10),
      ItemIdType: "ASIN",
      Marketplace: "www.amazon.co.uk",
      PartnerTag: AMAZON_TAG,
      PartnerType: "Associates",
      Resources: ["Images.Primary.Medium", "Offers.Listings.Price"],
    });
    const now = new Date();
    const res = await fetch(`https://${HOST}${PATH}`, {
      method: "POST",
      headers: signedHeaders(body, accessKey, secretKey, now),
      body,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`PA-API ${res.status}`);
    const data = (await res.json()) as GetItemsResponse;
    for (const item of data.ItemsResult?.Items ?? []) {
      const image = item.Images?.Primary?.Medium?.URL;
      offers[item.ASIN] = {
        price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount,
        // Only Amazon's own image host, over https.
        image: image && /^https:\/\/m\.media-amazon\.com\//.test(image) ? image : undefined,
        fetchedAt: now.toISOString(),
      };
    }
    if (i + 10 < asins.length) await new Promise((r) => setTimeout(r, 1100));
  }
  return offers;
}

const cachedOffers = unstable_cache(fetchOffers, ["paapi-offers-v1"], { revalidate: 3600 });

/** Live prices and photos by ASIN, or an empty record when the API is off or fails. */
export async function getOffers(): Promise<Offers> {
  if (!paapiEnabled()) return {};
  try {
    return await cachedOffers();
  } catch {
    // A failed call must never break the page; it falls back to names and links.
    return {};
  }
}
