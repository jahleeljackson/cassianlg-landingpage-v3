import {
  hbrStudy,
  industryBenchmarks,
  problemSources,
  problems,
  speedStats,
} from "@/lib/site";

export function Problem() {
  return (
    <section id="problem" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-gray">
          The problem
        </p>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-navy sm:text-5xl">
          Inbound demand is already there. Follow-up is not.
        </h2>

        <ol className="mt-12 divide-y divide-gray-line border-y border-gray-line">
          {problems.map((item) => (
            <li key={item.title} className="py-6">
              <h3 className="font-serif text-xl leading-snug text-navy sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-7 text-gray">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <article className="mt-16 border-t border-gray-line pt-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gray">
            What the research shows
          </p>
          <blockquote className="mt-5 max-w-3xl">
            <p className="text-base leading-8 text-gray">{hbrStudy.body}</p>
            <footer className="mt-4 text-sm text-navy">
              <a
                href={hbrStudy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gray-line underline-offset-4 hover:decoration-navy"
              >
                {hbrStudy.publication}, “{hbrStudy.title},” {hbrStudy.date}
              </a>
            </footer>
          </blockquote>

          <div className="mt-10 grid gap-8 border-t border-gray-line pt-10 sm:grid-cols-3">
            {speedStats.map((item) => (
              <div key={item.label}>
                <p className="font-serif text-4xl tracking-tight text-navy">
                  {item.stat}
                </p>
                <h3 className="mt-3 font-semibold text-navy">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-gray">{item.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="mt-16 border-t border-gray-line pt-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gray">
            Industry benchmarks — the reality gap
          </p>
          <h3 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-navy">
            Most companies do not respond in time. Many never respond at all.
          </h3>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {industryBenchmarks.map((item) => (
              <div key={item.label} className="border-l-2 border-navy pl-5">
                <p className="font-serif text-3xl tracking-tight text-navy">
                  {item.stat}
                </p>
                <h4 className="mt-3 font-semibold text-navy">{item.label}</h4>
                <p className="mt-2 text-sm leading-6 text-gray">{item.body}</p>
              </div>
            ))}
          </div>
        </article>

        <p className="mt-12 text-xs leading-6 text-gray">
          Sources:{" "}
          {problemSources.map((source, index) => (
            <span key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy underline decoration-gray-line underline-offset-4 hover:decoration-navy"
              >
                {source.label}
              </a>
              {index < problemSources.length - 1 ? "; " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
