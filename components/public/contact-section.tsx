"use client";
import { useState } from "react";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  function send() {
    const name = (document.getElementById("cname") as HTMLInputElement)?.value;
    const email = (document.getElementById("cemail") as HTMLInputElement)?.value;
    const msg = (document.getElementById("cmsg") as HTMLTextAreaElement)?.value;
    if (!name || !email || !msg) { alert("Please fill all fields."); return; }
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:tahamahmood2903@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return (
    <section id="contact" className="block">
      <div className="container">
        <div className="section-eyebrow">Contact</div>
        <h2 className="section-heading">Get in Touch</h2>
        <p className="section-sub">Open to research collaborations, graduate opportunities, and R&D roles.</p>
        <div className="contact-grid">
          <div className="contact-items">
            {[
              { icon: "✉", label: "Email", value: "tahamahmood2903@gmail.com", href: "mailto:tahamahmood2903@gmail.com" },
              { icon: "📞", label: "Phone", value: "+92 324 857 5602", href: "tel:+923248575602" },
              { icon: "in", label: "LinkedIn", value: "linkedin.com/in/taha-mahmood", href: "https://linkedin.com/in/taha-mahmood" },
              { icon: "gh", label: "GitHub", value: "github.com/taha-mahmood", href: "https://github.com/taha-mahmood" },
              { icon: "📍", label: "Location", value: "Rawalpindi, Pakistan", href: null },
            ].map((item) => (
              <div key={item.label} className="contact-item">
                <div className="contact-icon">{item.icon}</div>
                <div>
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">
                    {item.href ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener">{item.value}</a> : item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="contact-form-card">
            {sent ? (
              <div style={{textAlign:"center",padding:"2rem 0"}}>
                <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>✅</div>
                <p style={{color:"var(--accent)",fontWeight:600}}>Email client opened!</p>
                <p style={{fontSize:"0.82rem",color:"var(--muted)",marginTop:"0.25rem"}}>Send the email from your mail app.</p>
              </div>
            ) : (
              <>
                <div><label className="form-label" htmlFor="cname">Your Name</label><input id="cname" className="form-input" placeholder="John Doe" /></div>
                <div><label className="form-label" htmlFor="cemail">Your Email</label><input id="cemail" className="form-input" type="email" placeholder="john@example.com" /></div>
                <div><label className="form-label" htmlFor="cmsg">Message</label><textarea id="cmsg" className="form-textarea" placeholder="Hi Taha, I'd like to discuss..." /></div>
                <button className="btn-full" onClick={send}>✉ Send Message</button>
                <p className="form-hint">Opens your email client with the message pre-filled.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
