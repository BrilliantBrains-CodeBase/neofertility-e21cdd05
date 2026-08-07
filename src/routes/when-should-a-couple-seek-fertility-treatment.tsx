import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/sections/blocks";
import { Prose } from "@/components/sections/ServicePage";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.blogWhenToSeek;

export const Route = createFileRoute("/when-should-a-couple-seek-fertility-treatment")({
  head: () => ({
    ...pageMeta({
      title: "When Should a Couple Seek Fertility Treatment? | Neo Fertility",
      description:
        "How long to try for a baby naturally, warning signs that shouldn't wait, and when to book a fertility evaluation in Bangalore.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Blogs", path: ROUTES.blogs },
          { name: "When Should a Couple Seek Fertility Treatment", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Fertility"
        title="When Should a Couple Seek Fertility Treatment?"
        intro="A practical guide to how long to try naturally, the signs that warrant an earlier evaluation, and what a first fertility consultation looks like."
        trail={[
          { name: "Home", to: ROUTES.home },
          { name: "Blogs", to: ROUTES.blogs },
          { name: "When Should a Couple Seek Fertility Treatment" },
        ]}
      />

      <div className="container-page py-14 lg:py-16">
        <div className="mx-auto max-w-[72ch] space-y-10">
          <Prose title="The general rule of thumb">
            <p>
              Most doctors advise that a couple trying to conceive through regular, unprotected intercourse should
              seek a fertility evaluation if pregnancy has not occurred after 12 months, for women under 35. For
              women aged 35 and above, this window shortens to 6 months, because egg quantity and quality decline
              more quickly with age. Waiting the full year in this age group can mean losing valuable time.
            </p>
            <p>
              These are general guidelines. Some couples should seek an evaluation much sooner, based on their
              medical history or symptoms, rather than waiting for the standard timeline to pass.
            </p>
          </Prose>

          <Prose title="Signs you should not wait 6 to 12 months">
            <p>It is worth booking a consultation earlier than the standard timeline if any of the following apply:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Irregular, absent, or very painful periods</li>
              <li>A known diagnosis of PCOS, endometriosis, or thyroid disorder</li>
              <li>A history of pelvic infection, pelvic surgery, or a ruptured appendix</li>
              <li>One or more prior miscarriages</li>
              <li>The male partner has a known history of low sperm count, undescended testes, or previous surgery in the groin area</li>
              <li>The woman is 35 or older</li>
              <li>Either partner has a chronic illness such as diabetes or is undergoing cancer treatment</li>
            </ul>
          </Prose>

          <Prose title="What happens at a first consultation">
            <p>
              At Neo Fertility Clinic in Marathahalli, a first fertility consultation with Dr. Payal Mahapatra begins
              with a detailed history of both partners, including menstrual history, past pregnancies, surgeries,
              and lifestyle factors. This is usually followed by a pelvic ultrasound for the woman and a semen
              analysis for the male partner, along with basic hormone blood tests. These results help determine
              whether the cause is related to ovulation, tubal factors, sperm parameters, or is unexplained, and
              guide the treatment plan, whether that is lifestyle changes, ovulation induction, IUI, or IVF.
            </p>
          </Prose>

          <Prose title="Why earlier evaluation helps">
            <p>
              Fertility treatment is rarely a single step. Working through a diagnostic evaluation, trying a first
              line of treatment, and moving to a more advanced option if needed all take time. Starting this process
              earlier, especially for women over 35 or where symptoms already point to an underlying condition,
              generally gives couples more treatment options and a better chance of success within a shorter overall
              timeframe.
            </p>
          </Prose>
        </div>
      </div>

      <ClosingCta
        heading="Not sure if it's time yet? Let's talk it through."
        copy="Book a consultation with Dr. Payal Mahapatra to review your history and get clarity on the right next step."
        sourcePage="blog-when-to-seek"
        whatsappMessage="Hi, I read your article on when to seek fertility treatment and would like to book a consultation."
      />
    </>
  );
}
