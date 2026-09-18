"use client";

import { useEffect, useState } from "react";
import TrendChart from "@/components/TrendChart";
import type { Point } from "@/data/safer-world";

type Country = { code: string; name: string };
type Series = { code: string; name: string; child: Point[]; life: Point[]; poverty: Point[]; disasters: Point[] };

type Props = {
  world: Series;
  famine: Point[];
};

/**
 * The five "safest time" charts with a country selector. World is bundled;
 * other countries are fetched from /data/safer/<code>.json on demand.
 */
export default function SaferWorldCharts({ world, famine }: Props) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [code, setCode] = useState("OWID_WRL");
  const [series, setSeries] = useState<Series>(world);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/data/safer/index.json")
      .then((r) => r.json())
      .then((list: Country[]) => setCountries(list.filter((c) => c.code !== "OWID_WRL")))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (code === "OWID_WRL") {
      setSeries(world);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/data/safer/${code}.json`)
      .then((r) => r.json())
      .then((s: Series) => {
        if (!cancelled) setSeries(s);
      })
      .catch(() => {
        if (!cancelled) setSeries(world);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [code, world]);

  const name = series.name === "World" ? "World" : series.name;
  const span = (pts: Point[]) => (pts.length ? `${pts[0][0]} to ${pts[pts.length - 1][0]}` : "");

  return (
    <div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label htmlFor="safer-country" className="text-sm font-medium">
          Show the figures for
        </label>
        <select
          id="safer-country"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="rounded-full border border-line bg-surface px-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="OWID_WRL">The world</option>
          <option value="GBR">United Kingdom</option>
          {countries
            .filter((c) => c.code !== "GBR")
            .map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
        </select>
        {loading ? <span className="text-sm text-muted">Loading</span> : null}
      </div>
      <p className="mt-3 text-sm text-muted">
        Country records start later and are patchier than the world series, and a small country&rsquo;s disaster
        figures can be dominated by one event. The direction is the same almost everywhere.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {series.child.length > 2 ? (
          <TrendChart
            title={`Share of children dying before age five: ${name}`}
            subtitle={`Per cent, ${span(series.child)}`}
            data={series.child}
            kind="line"
            unit="%"
            valueFormat="decimal"
            source={{ label: "Our World in Data, Gapminder and UN IGME", url: "https://ourworldindata.org/grapher/child-mortality" }}
          />
        ) : null}
        {series.life.length > 2 ? (
          <TrendChart
            title={`Life expectancy at birth: ${name}`}
            subtitle={`Years, ${span(series.life)}. A low early figure is mostly child deaths; adults who survived childhood lived far longer than the average suggests.`}
            data={series.life}
            kind="line"
            unit="years"
            valueFormat="int"
            source={{ label: "Our World in Data, UN WPP and Riley", url: "https://ourworldindata.org/grapher/life-expectancy" }}
          />
        ) : null}
        {series.poverty.length > 2 ? (
          <TrendChart
            title={`Share of people in extreme poverty: ${name}`}
            subtitle={`Per cent, ${span(series.poverty)}`}
            data={series.poverty}
            kind="line"
            unit="%"
            valueFormat="int"
            source={{ label: "Our World in Data, World Bank", url: "https://ourworldindata.org/grapher/share-of-population-in-extreme-poverty" }}
          />
        ) : null}
        {series.disasters.length > 2 ? (
          <TrendChart
            title={`Deaths a year from natural disasters: ${name}`}
            subtitle="Average per year in each decade, 1900s to 2010s"
            data={series.disasters}
            kind="bar"
            xFormat="decade"
            source={{ label: "Our World in Data, EM-DAT", url: "https://ourworldindata.org/grapher/decadal-deaths-disasters-type" }}
          />
        ) : null}
      </div>
      <div className="mt-6">
        <TrendChart
          title="Deaths from famine: the world"
          subtitle="Total per decade, 1870s to 2010s. Famine figures are only published for the world as a whole."
          data={famine}
          kind="bar"
          xFormat="decade"
          source={{ label: "Our World in Data, famine deaths by decade", url: "https://ourworldindata.org/grapher/deaths-from-famines-by-decade" }}
        />
      </div>
    </div>
  );
}
