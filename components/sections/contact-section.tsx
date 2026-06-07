"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading */}
          <Reveal variant="right">
            <div>
              <h2 className="text-balance text-4xl font-semibold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Let&apos;s Create
                <br />
                <span className="text-primary">Together</span>
              </h2>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Ready to elevate your brand&apos;s presence? Reach out today to
                discuss your next cinematic project.
              </p>

              <div className="mt-10 border-t border-border pt-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Email Us
                </p>
                <a
                  href="mailto:feinmediaproductions@gmail.com"
                  className="mt-2 block text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  feinmediaproductions@gmail.com
                </a>
                <a
                  href="tel:0542271935"
                  className="mt-2 block text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  054-227-1935
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal variant="left" delay={150}>
            <div className="rounded-2xl border border-border bg-card p-7 md:p-9">
            {submitted ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <p className="text-2xl font-semibold text-foreground">Thank you!</p>
                <p className="mt-3 text-muted-foreground">
                  We&apos;ve received your message and will be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="First Name" name="firstName" required />
                  <Field label="Last Name" name="lastName" required />
                </div>
                <Field label="Email" name="email" type="email" placeholder="example@domain.com" required />
                <Field label="Subject" name="subject" required />
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                >
                  Send Message
                </button>
              </form>
            )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
