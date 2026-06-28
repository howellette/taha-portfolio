"use client";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="icon-btn" title={copied ? "Copied!" : "Copy email"} style={{ fontSize: "0.75rem" }}>
      {copied ? "✓" : "✉"}
    </button>
  );
}
