import { nationsNote, officialChannels, officialChannelsIntro } from "@/data/official-channels";

/** "In an emergency": the official channels, ahead of anything on this site. */
export default function OfficialChannels() {
  return (
    <section aria-labelledby="official-h" className="border-t-[3px] border-ink py-16 min-[900px]:py-26">
      <div className="wrap min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] min-[900px]:items-start min-[900px]:gap-16">
        <div>
          <h2 id="official-h" className="h-section max-w-[14ch]">
            in an emergency, go to official sources
          </h2>
          <p className="mt-5 max-w-[48ch] text-[1.1875rem] leading-normal">{officialChannelsIntro}</p>
        </div>
        <div className="mt-8 min-[900px]:mt-3">
          <ul className="border-t-[3px] border-ink">
            {officialChannels.map((c) => (
              <li key={c.name} className="border-b border-ink py-4">
                <p className="text-lg font-extrabold leading-snug">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                </p>
                <p className="mt-1 leading-snug">{c.what}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.9375rem] leading-snug text-ink-2">{nationsNote}</p>
        </div>
      </div>
    </section>
  );
}
