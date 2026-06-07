"use client";

import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Our Work", href: "#work" },
  { label: "The Advantage", href: "#advantage" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/fein_media_productions" },
  { label: "TikTok", href: "https://www.tiktok.com/@feinmediaproductions" },
  { label: "Facebook", href: "https://www.facebook.com/share/1H6nUQriZV/?mibextid=wwXIfr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shraga-fein-748442410" },
];

export function FooterSection() {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      {/* Big brand band */}
      <div className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/fein-logo.png"
                alt="Fein Media Productions"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <span className="text-lg font-semibold text-foreground">
                FEIN<span className="text-primary">MEDIA</span>
              </span>
            </Link>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Est. 2026
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Powerful videos that tell your story and drive real results.
              Videography, editing, and social media management.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Get in touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:feinmediaproductions@gmail.com"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  feinmediaproductions@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:0542271935"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  054-227-1935
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/9720542271935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Fein Media Productions. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
            <a
              href="https://wa.me/9720542271935"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
