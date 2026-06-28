"use client";
import { useState } from "react";
import type { Profile, Section } from "@/lib/types";

export function Nav({ profile, sections }: { profile: Profile | null; sections: Section[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">{profile?.full_name?.split(" ")[0].toLowerCase() ?? "taha"}.dev</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          {sections.map((s) => <a key={s.id} href={`#${s.slug}`}>{s.title}</a>)}
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-mobile" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <a href="#home" onClick={() => setOpen(false)}>Home</a>
        {sections.map((s) => <a key={s.id} href={`#${s.slug}`} onClick={() => setOpen(false)}>{s.title}</a>)}
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </div>
    </>
  );
}
