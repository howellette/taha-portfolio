import { getProfile, getSections, getEntries } from "@/lib/data/portfolio";
import { Nav } from "@/components/public/nav";
import { Hero } from "@/components/public/hero";
import { PortfolioSections } from "@/components/public/portfolio-sections";
import { Footer } from "@/components/public/footer";

export const revalidate = 0;

export default async function Home() {
  const profile = await getProfile();
  const sections = await getSections();
  const sectionsWithEntries = await Promise.all(
    sections.map(async (s) => ({ ...s, entries: await getEntries(s.id) }))
  );
  return (
    <>
      <Nav profile={profile} sections={sections} />
      <main>
        <Hero profile={profile} />
        <PortfolioSections sections={sectionsWithEntries} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
