import { getProfile, getPortfolioView, getEntries, getAllSections } from "@/lib/data/portfolio";
import { Nav } from "@/components/public/nav";
import { Hero } from "@/components/public/hero";
import { PortfolioSections } from "@/components/public/portfolio-sections";
import { Footer } from "@/components/public/footer";
import { notFound } from "next/navigation";

export default async function CustomViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [profile, view, allSections] = await Promise.all([getProfile(), getPortfolioView(slug), getAllSections()]);
  if (!view) notFound();

  const sections = allSections.filter((s) => view.section_ids.includes(s.id));
  const sectionsWithEntries = await Promise.all(
    sections.map(async (s) => ({ ...s, entries: await getEntries(s.id) }))
  );

  return (
    <>
      <Nav profile={profile} sections={sections} />
      <div style={{background:"rgba(56,189,248,0.06)",borderBottom:"1px solid rgba(56,189,248,0.15)",padding:"0.6rem 0",marginTop:"58px",textAlign:"center"}}>
        <span style={{fontSize:"0.8rem",color:"var(--accent)"}}>Custom view: <strong>{view.label}</strong></span>
      </div>
      <main>
        <Hero profile={profile} />
        <PortfolioSections sections={sectionsWithEntries} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
