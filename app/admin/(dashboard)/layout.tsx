"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && !window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      }
      setChecked(true);
    }
    checkAuth();
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  if (!checked) return <div style={{color:"var(--muted)",padding:"2rem"}}>Loading...</div>;

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
