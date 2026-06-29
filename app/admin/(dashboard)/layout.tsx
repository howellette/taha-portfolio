"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    // Give session time to load from storage
    setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.replace("/admin/login");
      } else {
        setReady(true);
      }
    }, 300);
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.replace("/admin/login");
  }

  if (!ready) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"var(--bg)",color:"var(--muted)"}}>
      Loading...
    </div>
  );

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
