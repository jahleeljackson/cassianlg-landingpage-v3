import { BookingButton } from "@/components/BookingButton";
import { faqs } from "@/lib/site";

export function Faqs() {
  return (
    <section id="faqs" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-gray">
              FAQs
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-navy sm:text-5xl">
              Quick answers.
            </h2>
            <BookingButton className="mt-8">
              Book a Revenue Recovery Review
            </BookingButton>
          </div>

          <div className="divide-y divide-gray-line border-y border-gray-line">
            {faqs.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="cursor-pointer list-none font-serif text-xl text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-baseline justify-between gap-6">
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="font-sans text-sm text-gray transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-xl text-sm leading-7 text-gray">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
