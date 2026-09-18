export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-semibold mb-6">Prepare</h1>
      <p className="text-lg text-neutral-700 mb-4">
        A practical, non-alarmist guide to what to keep on hand for social
        disruption, and realistically how long it lasts. This is not about
        fending for yourself. People pull together in a crisis, and this site
        is built on that.
      </p>
      <p className="text-neutral-600 mb-8">
        Placeholder home page. See PLAN.md in the project root for the full
        site map and build phases.
      </p>
      <a
        href="/offline/index.html"
        download="prepare-offline-guide.html"
        className="inline-block rounded-md bg-neutral-900 text-white px-5 py-3 text-sm font-medium hover:bg-neutral-700"
      >
        Download the offline guide (HTML, works with no internet)
      </a>
      <p className="text-sm text-neutral-500 mt-2">
        A single self-contained file with no external requests &mdash; save
        it, print it, or share it before you need it.
      </p>
    </main>
  );
}
