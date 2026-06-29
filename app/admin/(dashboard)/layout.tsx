"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthed(true);
      } else {
        window.location.href = "/admin/login";
      }
      setChecked(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuthed(true);
      } else {
        window.location.href = "/admin/login";
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  if (!checked) return <div style={{color:"var(--muted)",padding:"2rem",background:"var(--bg)",minHeight:"100vh"}}>Loading...</div>;
  if (!authed) return null;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">⚡ Admin Panel</div>
        <nav>
          <a href="/admin">🏠 Dashboard</a>
          <a href="/admin/profile">👤 Profile</a>
          <a href="/admin/sections">📋 Sections</a>
          <a href="/admin/views">🔗 Custom Views</a>
          <a href="/" target="_blank">🌐 View Site</a>
        </nav>
        <button onClick={logout} className="btn-admin btn-secondary" style={{width:"100%",marginTop:"2rem"}}>
          Sign Out
        </button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
