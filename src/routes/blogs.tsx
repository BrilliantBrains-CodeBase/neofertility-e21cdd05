import { createFileRoute } from "@tanstack/react-router";
import { PageHero, InfoCard } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.blogs;

const POSTS = [
  {
    title: "When Should a Couple Seek Fertility Treatment?",
    copy: "How long to try naturally, red flags to watch for, and when a fertility evaluation is worth booking.",
    to: ROUTES.blogWhenToSeek,
  },
  {
    title: "IVF Treatment in Bangalore: A Complete Guide",
    copy: "What IVF involves, success rates, costs and how to choose the right clinic in Bangalore.",
    to: ROUTES.blogIvfBangalore,
  },
  {
    title: "Male Infertility: Causes, Diagnosis and Treatment",
    copy: "Why male fertility factors matter, common causes, and the tests and treatments available.",
    to: ROUTES.blogMaleInfertility,
  },
];

export const Route = createFileRoute("/blogs")({
  head: () => ({
    ...pageMeta({
      title: "Fertility & Gynecology Blog | Neo Fertility Clinic",
      description:
        "Articles from Neo Fertility Clinic, Marathahalli, Bangalore on fertility treatment, IVF and male infertility, written for patients.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Blogs", path: PATH },
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
        eyebrow="Resources"
        title="Fertility & gynecology articles"
        intro="Plain-language guides from Dr. Payal Mahapatra and the Neo Fertility Clinic team, to help you understand your options."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Blogs" }]}
      />

      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <InfoCard key={post.to} title={post.title} copy={post.copy} to={post.to} />
          ))}
        </div>
      </div>
    </>
  );
}
