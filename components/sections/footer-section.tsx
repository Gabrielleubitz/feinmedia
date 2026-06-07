"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { scrollToSection, scrollToTop } from "@/lib/scroll-to-section";

const CALENDLY_URL = "https://calendly.com/feinmediaproductions";

const navLinks = [
  { label: "Our Work", href: "#work" },
  { label: "The Advantage", href: "#advantage" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: CALENDLY_URL },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/fein_media_productions" },
  { label: "TikTok", href: "https://www.tiktok.com/@feinmediaproductions" },
  { label: "Facebook", href: "https://www.facebook.com/share/1H6nUQriZV/?mibextid=wwXIfr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shraga-fein-748442410" },
];

const PHONE_DISPLAY = "054-227-1935";
const PHONE_HREF = "tel:+972542271935";
const WHATSAPP_HREF = "https://wa.me/972542271935";
const EMAIL = "feinmediaproductions@gmail.com";

function isExternalNavLink(href: string) {
  return href.startsWith("http");
}

function handleHashClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  event.preventDefault();
  scrollToSection(href);
}

function handleHomeClick(event: MouseEvent<HTMLAnchorElement>) {
  if (window.location.pathname !== "/") return;
  event.preventDefault();
  scrollToTop();
}

export function FooterSection() {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="flex items-center gap-3"
            >
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

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => {
                const external = isExternalNavLink(link.href);
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={
                        external
                          ? undefined
                          : (event) => handleHashClick(event, link.href)
                      }
                      className="inline-block py-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Get in touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="break-all text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={PHONE_HREF}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Book a call
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 sm:px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-xs text-muted-foreground md:text-left">
            © 2026 Fein Media Productions. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
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
              href={WHATSAPP_HREF}
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
