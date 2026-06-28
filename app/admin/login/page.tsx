"use client";
import { useState } from "react";
import { login } from "@/lib/actions/admin";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) { setError(result.error); setLoading(false); }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <div className="admin-login-title">Admin Login</div>
        <div className="admin-login-sub">Sign in to manage your portfolio</div>
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="error-msg">{error}</div>}
          <div>
            <label className="admin-label">Email</label>
            <input name="email" type="email" className="admin-input" placeholder="you@email.com" required />
          </div>
          <div>
            <label className="admin-label">Password</label>
            <input name="password" type="password" className="admin-input" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-admin btn-save" style={{width:"100%",padding:"0.65rem"}} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
