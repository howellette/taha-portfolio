import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taha Mahmood — EE Researcher & AI Engineer",
  description: "Portfolio of Taha Mahmood, Electrical Engineering student at NUST Pakistan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
