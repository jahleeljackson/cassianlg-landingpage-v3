import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-gray">
          {site.dba}
        </p>
        <h1 className="mt-8 max-w-4xl font-serif text-[2.6rem] leading-[1.08] tracking-tight text-navy sm:text-6xl lg:text-[4.4rem]">
          {site.headline}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray sm:text-xl sm:leading-9">
          {site.subheadline}
        </p>
        <div className="mt-10">
          <ButtonLink href="#book">{site.primaryCta}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
