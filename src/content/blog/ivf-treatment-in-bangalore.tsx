import { Link } from "@tanstack/react-router";
import { Prose, DataTable } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/treatment-ivf.webp";
import ogCover from "@/assets/og/og-treatment-ivf.jpg";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "ivf-treatment-in-bangalore",
  title: "IVF Treatment in Bangalore: A Complete Guide",
  excerpt:
    "What IVF involves, success rates, costs and how to choose the right clinic in Bangalore.",
  intro:
    "An overview of how IVF works, what it costs in Bangalore, expected success rates, and what to look for while choosing a clinic.",
  category: "IVF",
  readMinutes: 2, // 303 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "A newborn baby resting in a parent's cupped hands",
    width: 720,
    height: 360,
    ogSrc: ogCover,
  },
  metaTitle: "IVF Treatment in Bangalore: Everything You Need to Know – Neo Fertility Clinic",
  metaDescription:
    "Everything to know about IVF treatment in Bangalore: the process, success rates, costs, and how to choose a clinic. By Dr. Payal Mahapatra, Marathahalli.",
  related: [
    { label: "IVF treatment", to: ROUTES.ivf },
    { label: "ICSI treatment", to: ROUTES.icsi },
    { label: "IUI treatment", to: ROUTES.iui },
    { label: "IVF cost in Bangalore", to: ROUTES.ivfCost },
    { label: "Infertility evaluation and treatment", to: ROUTES.infertility },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Considering IVF? Start with a personalised consultation.",
    copy: "Discuss your reports, options and realistic costs with Dr. Payal Mahapatra before deciding on a treatment path.",
    sourcePage: "blog-ivf-bangalore",
    whatsappMessage:
      "Hi, I read your IVF guide and would like to book a consultation to discuss my case.",
  },
};

export function Body() {
  return (
    <>
      <Prose title="What IVF involves">
        <p>
          In-vitro fertilization (IVF) is a treatment where eggs are retrieved from the ovaries
          after hormonal stimulation, fertilized with sperm in a laboratory, and the resulting
          embryo is transferred back into the uterus. A typical IVF cycle runs over 4 to 6 weeks and
          includes ovarian stimulation with daily injections, monitoring through ultrasounds and
          blood tests, egg retrieval under sedation, fertilization in the lab (sometimes using
          ICSI), embryo culture, and embryo transfer.
        </p>
      </Prose>

      <Prose title="Who IVF is recommended for">
        <ul className="list-disc space-y-2 pl-5">
          <li>Blocked or damaged fallopian tubes</li>
          <li>Severe male factor infertility</li>
          <li>Diminished ovarian reserve or advanced maternal age</li>
          <li>Endometriosis affecting fertility</li>
          <li>Failed IUI cycles</li>
          <li>Unexplained infertility after other treatments</li>
          <li>Use of donor eggs, donor sperm, or a gestational carrier</li>
        </ul>
      </Prose>

      <section>
        <h2 className="text-[1.625rem]">Typical IVF cost ranges in Bangalore</h2>
        <p className="prose-measure mt-4 text-ink-muted">
          Costs vary based on the protocol used, medication doses, and any additional procedures
          such as ICSI or genetic testing. Approximate ranges seen in Bangalore are below; see our{" "}
          <Link to={ROUTES.ivfCost} className="text-pink-700 underline">
            detailed IVF cost guide
          </Link>{" "}
          for a full breakdown.
        </p>
        <div className="mt-6">
          <DataTable
            head={["Component", "Typical range"]}
            rows={[
              ["Basic IVF cycle (without medication)", "₹90,000 – ₹1,50,000"],
              ["Medication (stimulation drugs)", "₹40,000 – ₹90,000"],
              ["ICSI (if required)", "₹15,000 – ₹25,000 additional"],
              ["Frozen embryo transfer (separate cycle)", "₹30,000 – ₹50,000"],
            ]}
          />
        </div>
      </section>

      <Prose title="Success rates">
        <p>
          IVF success depends heavily on the woman's age, ovarian reserve, and the underlying cause
          of infertility. As a general guide, per-cycle success rates tend to be highest for women
          under 35 and decline progressively after that. At Neo Fertility Clinic, we discuss
          realistic, individualised success expectations at the first consultation, based on your
          specific test results rather than average statistics alone.
        </p>
      </Prose>

      <Prose title="Choosing an IVF clinic in Bangalore">
        <p>
          Look for a clinic with an on-site, accredited embryology lab, transparent published
          pricing, a doctor who reviews your case personally rather than a purely protocol-driven
          approach, and clear communication at every stage. Dr. Payal Mahapatra has personally
          overseen more than 2,000 IVF cycles from her clinic in Marathahalli, serving patients
          across Whitefield, Bellandur and East Bangalore.
        </p>
      </Prose>
    </>
  );
}
