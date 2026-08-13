import { useState } from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import consultRoom from "@/assets/clinic-consult-room.jpg";
import reception from "@/assets/clinic-reception.jpg";
import ultrasound from "@/assets/clinic-ultrasound.jpg";

type Review = {
  name: string;
  role: string;
  rating: number;
  title: string;
  /** Paragraphs separated by a blank line; preserved verbatim in the expanded dialog. */
  body: string;
  image: string;
  alt: string;
  /** No video URLs supplied yet — when one is set, the play button renders. */
  videoUrl: string | null;
};

const REVIEWS: Review[] = [
  {
    name: "Sneha Subudhi",
    role: "Patient · Neo Fertility Clinic",
    rating: 5,
    title: "A Miracle After A Long Wait",
    body: `I had been trying to conceive for almost a year without any positive results. On the recommendation of some friends, I consulted Dr. Payal at Neo Clinic.

Under her expert guidance and care, I underwent pregnancy induction treatment. Dr. Payal took the time to explain every step of the process in detail, which made me feel informed and reassured throughout my journey.

Within just six months of starting treatment with Neo Clinic, I received the long-awaited positive result. It truly felt like a miracle after such a long journey.

I am deeply grateful to Dr. Payal and the entire Neo Clinic team for their professionalism, expertise, and compassionate support throughout the process.`,
    image: consultRoom,
    alt: "Consultation room at Neo Fertility Clinic",
    videoUrl: null,
  },
  {
    name: "Pramila Sahu",
    role: "Patient · Neo Fertility Clinic",
    rating: 5,
    title: "Best Fertility Expert",
    body: `I have been trying to conceive since February and consulted Dr. Payal at Neo Fertility Clinic.

From the very first consultation, she explained everything clearly, guided me through timely scans and injections, and made the whole process so smooth and reassuring.

I'm so happy to share that I have conceived after a long wait. Dr. Payal is the best Fertility Expert and I would highly recommend Dr. Payal and Neo Fertility Clinic to anyone dealing with fertility related issues.

The entire team at Neo Fertility Clinic is professional, caring, and supportive.`,
    image: reception,
    alt: "Reception area at Neo Fertility Clinic",
    videoUrl: null,
  },
  {
    name: "Shruti Gupta",
    role: "Patient · Neo Fertility Clinic",
    rating: 5,
    title: "Constant Support And Care",
    body: `Words can't express how thankful I am to Payal ma'am. Throughout my journey to become pregnant, she stood by me with constant support and care. My husband and I struggled for a long time, and our dream came true only because of Dr. Payal.

I have deep trust in her. Whenever I felt scared or unsure, I would remind myself that Payal ma'am is an excellent doctor—and just that thought would bring me peace. She is truly dedicated, always listening patiently and answering every doubt with compassion.

She personally did all my scans, even coming to the clinic on holidays when needed. There were times when scans were required daily, and she was always there without fail. Her treatment is always accurate, and her deep knowledge gave me so much confidence.

I'm truly grateful to be going through this journey with her. The clinic is always very hygienic, and everyone there always treated us with respect and care.

I would definitely recommend Dr. Payal to anyone struggling with infertility and looking for a specialist.`,
    image: ultrasound,
    alt: "Ultrasound room at Neo Fertility Clinic",
    videoUrl: null,
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {Array.from({ length: rating }, (_, i) => (
        <li key={i}>
          <Star aria-hidden className="size-3.5 fill-current text-alert 2xl:size-4" />
        </li>
      ))}
    </ul>
  );
}

export function PatientReviews() {
  const [openReview, setOpenReview] = useState<Review | null>(null);

  /* Also holds still while a review dialog is open — otherwise the carousel scrolls
     the card out from under the dialog the visitor just opened. */
  const { plugins, setApi, pauseProps } = useCarouselAutoplay({
    delay: 3000,
    paused: !!openReview,
  });

  return (
    <section
      aria-labelledby="patient-reviews"
      className="overflow-hidden bg-pink-25 pt-10 pb-5 sm:pt-[50px] md:pt-[70px] md:pb-10 2xl:pt-[100px] 2xl:pb-[70px]"
    >
      {/* Header and carousel share container-page so their left edges stay aligned —
          widening only the carousel would push the cards outside the heading. This used
          to be a bespoke w-[90%]; container-page is now 90% itself, so it lines up with
          every other section instead of only with itself. */}
      <div className="container-page mb-[30px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="lg:w-1/2 xl:w-5/12">
            <p className="flex items-center gap-2 text-[1.125rem] font-semibold tracking-[0.08em] text-pink-600 uppercase">
              <Quote aria-hidden className="size-5" />
              Testimonials
            </p>
            <h2 id="patient-reviews" className="mt-3">
              What our patients say about us
            </h2>
          </Reveal>

          <div className="flex items-center gap-4 lg:w-1/2 lg:justify-end">
            <div className="flex min-h-[55px] items-center rounded-full bg-white ps-[15px] pe-[25px] sm:min-h-[62px] xl:min-h-[70px] xl:pe-[50px]">
              {/* Initials rather than faces — there are no photographs of these patients,
                  and a stock face beside a real name would assert something untrue. */}
              <div className="flex items-center">
                {REVIEWS.map((review, i) => (
                  <span
                    key={review.name}
                    aria-hidden
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full bg-pink-50 text-[0.6875rem] font-semibold text-pink-700 ring-2 ring-white sm:size-[42px] sm:text-[0.8125rem] xl:size-12 xl:text-[0.9375rem]",
                      i > 0 && "-ms-3",
                    )}
                  >
                    {initials(review.name)}
                  </span>
                ))}
                <span
                  aria-hidden
                  className="-ms-3 grid size-8 shrink-0 place-items-center rounded-full bg-plum-900 text-[0.6875rem] font-semibold text-paper ring-2 ring-white sm:size-[42px] sm:text-[0.8125rem] xl:size-12 xl:text-[0.9375rem]"
                >
                  +
                </span>
              </div>

              <span aria-hidden className="mx-4 h-8 w-px bg-line xl:mx-[25px]" />

              <span className="text-[0.75rem] leading-tight font-medium text-plum-900 sm:text-[1rem] xl:text-[1.25rem]">
                Talk to our fertility expert
              </span>
            </div>

            {/* No appointment route exists — every Book control on this site opens the sheet. */}
            <AppointmentSheet sourcePage="home_reviews">
              <button
                type="button"
                aria-label="Book an appointment"
                className="grid size-[55px] shrink-0 place-items-center rounded-full bg-pink-600 text-paper transition-colors hover:bg-pink-700 focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:outline-none md:size-[60px] lg:size-[70px]"
              >
                <ArrowUpRight aria-hidden className="size-6 lg:size-7" />
              </button>
            </AppointmentSheet>
          </div>
        </div>
      </div>

      {/* Carousel sits in the same centred container as every other section, so the
          gutters match on both sides. The fractional slide widths still let the next
          card peek in at the container's trailing edge, which keeps it reading as a
          carousel without the lopsided full-bleed.
          -mx-[10px] cancels each slide's own 10px padding so the card edges land flush
          with the container, not 10px inside it. */}
      <div {...pauseProps} className="container-page">
        <div className="-mx-[10px]">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            plugins={plugins}
            aria-label="Patient reviews"
          >
            {/* ml-0, not ms-0: the shadcn base sets -ml-4, and only an `ml` utility is
              recognised as conflicting, so ms-0 would leave the -16px in place. */}
            <CarouselContent className="ml-0">
              {REVIEWS.map((review, i) => (
                <CarouselItem
                  key={review.name}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${REVIEWS.length}: ${review.name}`}
                  className="basis-full p-[10px] pl-[10px] lg:basis-[83.333%] xl:basis-[62.5%] 2xl:basis-1/2"
                >
                  <div className="relative flex h-full flex-col sm:flex-row">
                    {/* Media half */}
                    <div className="h-[380px] w-full shrink-0 overflow-hidden rounded-t-[15px] shadow-[0_0_15px_rgba(61,32,63,0.05)] sm:w-[45%] sm:rounded-t-none sm:rounded-s-[15px] md:w-1/2 lg:h-[440px]">
                      <img
                        src={review.image}
                        alt={review.alt}
                        width={1280}
                        height={854}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>

                    {/* Review half — together these read as one card split down the middle */}
                    <div className="relative flex h-[380px] w-full flex-col overflow-hidden rounded-b-[15px] bg-white p-5 shadow-[0_0_15px_rgba(61,32,63,0.05)] sm:w-1/2 sm:rounded-b-none sm:rounded-e-[15px] md:p-[25px] lg:h-[440px] lg:px-[30px] lg:pt-[35px] lg:pb-[30px]">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute end-[25px] bottom-[30px] text-[65px] leading-none text-pink-500/25 select-none"
                      >
                        &rdquo;
                      </span>

                      <div className="flex items-center gap-2.5">
                        <Stars rating={review.rating} />
                        <h3 className="text-[1rem] lg:text-[1.125rem]">{review.title}</h3>
                      </div>

                      <p className="relative z-10 mt-4 line-clamp-5 text-[1rem] leading-[1.8] text-ink-muted lg:line-clamp-6 lg:text-[1.125rem]">
                        {review.body}
                      </p>

                      <button
                        type="button"
                        onClick={() => setOpenReview(review)}
                        className="relative z-10 mt-2 self-start text-[0.9375rem] font-medium text-pink-600 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        Read more
                        <span className="sr-only"> of {review.name}&rsquo;s review</span>
                      </button>

                      <div className="relative z-10 mt-auto flex items-center gap-4 pt-6">
                        <span
                          aria-hidden
                          className="grid size-[52px] shrink-0 place-items-center rounded-full bg-pink-50 text-[1rem] font-semibold text-pink-700 lg:size-[60px]"
                        >
                          {initials(review.name)}
                        </span>
                        <span>
                          <span className="block text-[1rem] font-medium text-plum-900 lg:text-[1.125rem]">
                            {review.name}
                          </span>
                          <span className="block text-[0.6875rem] text-ink-muted lg:text-[0.875rem]">
                            {review.role}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 left-2 z-10 size-11 -translate-y-1/2 border-line bg-white text-plum-900 shadow-rail hover:border-pink-600 hover:bg-white disabled:opacity-35 lg:left-3 xl:-left-12 2xl:-left-14" />
            <CarouselNext className="absolute top-1/2 right-2 z-10 size-11 -translate-y-1/2 border-line bg-white text-plum-900 shadow-rail hover:border-pink-600 hover:bg-white disabled:opacity-35 lg:right-3 xl:-right-12 2xl:-right-14" />
          </Carousel>
        </div>
      </div>

      <Dialog open={!!openReview} onOpenChange={(next) => !next && setOpenReview(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[42rem]">
          <DialogHeader>
            <DialogTitle>{openReview?.title}</DialogTitle>
          </DialogHeader>
          {openReview && (
            <>
              <Stars rating={openReview.rating} />
              {/* Split on blank lines so the reviewer's paragraphing survives */}
              <div className="mt-2 space-y-4 text-[1rem] leading-[1.8] text-ink-muted">
                {openReview.body.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-3 border-t border-line pt-4">
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-pink-50 text-[0.9375rem] font-semibold text-pink-700"
                >
                  {initials(openReview.name)}
                </span>
                <span>
                  <span className="block font-medium text-plum-900">{openReview.name}</span>
                  <span className="block text-[0.875rem] text-ink-muted">{openReview.role}</span>
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
