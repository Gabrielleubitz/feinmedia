"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Instagram, Facebook, Linkedin } from "lucide-react";

const navLinks = [
  { href: "#work", label: "Our Work" },
  { href: "#advantage", label: "The Advantage" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { href: "https://www.instagram.com/fein_media_productions", label: "Instagram", icon: Instagram },
  { href: "https://www.tiktok.com/@feinmediaproductions", label: "TikTok", icon: TikTokIcon },
  { href: "https://www.facebook.com/share/1H6nUQriZV/?mibextid=wwXIfr", label: "Facebook", icon: Facebook },
  { href: "https://www.linkedin.com/in/shraga-fein-748442410", label: "LinkedIn", icon: Linkedin },
];

const CALENDLY_URL = "https://calendly.com/feinmediaproductions";

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md rounded-full border border-border"
          : "rounded-full border border-white/15 bg-black/45 backdrop-blur-md shadow-lg shadow-black/20"
      }`}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2.5">
          <Image
            src="/images/fein-logo.png"
            alt="Fein Media Productions"
            width={40}
            height={40}
            className="h-9 w-9 rounded-full"
            priority
          />
          <span className="hidden text-base font-semibold tracking-tight text-foreground sm:inline">
            FEIN<span className="text-primary">MEDIA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-foreground ${
                isScrolled ? "text-muted-foreground" : "text-white/75 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <div className={`flex items-center gap-1 border-r pr-4 ${isScrolled ? "border-border" : "border-white/15"}`}>
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`rounded-full p-2 transition-colors hover:text-primary ${
                    isScrolled
                      ? "text-muted-foreground hover:bg-secondary"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            Book a call now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`transition-colors md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a call now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
