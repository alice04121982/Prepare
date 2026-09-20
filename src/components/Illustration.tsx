import fs from "node:fs";
import path from "node:path";

type Props = {
  /** File name without extension, looked up in public/illustrations/. */
  name: string;
  alt?: string;
  className?: string;
};

/**
 * Renders public/illustrations/<name>.svg (or .png) when present. Until an
 * illustration exists it draws a soft placeholder shape so layouts read as
 * intended. Server component: it checks the filesystem at build time.
 */
export default function Illustration({ name, alt = "", className = "" }: Props) {
  const dir = path.join(process.cwd(), "public", "illustrations");
  const file = [".svg", ".png", ".webp"]
    .map((ext) => `${name}${ext}`)
    .find((f) => fs.existsSync(path.join(dir, f)));

  if (file) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/illustrations/${file}`}
        alt={alt}
        className={`h-auto w-full object-contain ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`relative aspect-square w-full overflow-hidden rounded-card ${className}`}
    >
      <div className="absolute left-[12%] top-[18%] h-[56%] w-[56%] rounded-full bg-mint-light" />
      <div className="absolute bottom-[10%] right-[8%] h-[46%] w-[46%] rounded-full bg-sage-light" />
      <div className="absolute left-[38%] top-[40%] h-[26%] w-[26%] rounded-full bg-surface" />
    </div>
  );
}
