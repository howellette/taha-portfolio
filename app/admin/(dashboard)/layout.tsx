import { logout } from "@/lib/actions/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
        <form action={logout} style={{marginTop:"auto",paddingTop:"2rem"}}>
          <button type="submit" className="btn-admin btn-secondary" style={{width:"100%",marginTop:"1rem"}}>Sign Out</button>
        </form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
