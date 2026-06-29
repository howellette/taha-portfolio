"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.session) {
      // Wait a moment for session to be stored
      setTimeout(() => {
        window.location.replace("/admin");
      }, 500);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <div className="admin-login-title">Admin Login</div>
        <div className="admin-login-sub">Sign in to manage your portfolio</div>
        <div className="admin-login-form">
          {error && <div className="error-msg">{error}</div>}
          <div>
            <label className="admin-label">Email</label>
            <input
              type="email"
              className="admin-input"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Password</label>
            <input
              type="password"
              className="admin-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <button
            className="btn-admin btn-save"
            style={{width:"100%", padding:"0.65rem"}}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
