import Image from "next/image";
import Link from "next/link";

export function IganiBadge() {
  return (
    <Link
      href="https://www.igani.co"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Website built by Igani"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-white/20 bg-black/85 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        Built by
      </span>
      <Image
        src="/brand/igani-logo.png"
        alt="Igani"
        width={88}
        height={28}
        className="h-7 w-auto object-contain"
      />
    </Link>
  );
}

export function IganiCredit() {
  return (
    <section
      aria-label="Built by Igani"
      className="border-t border-border bg-card/40 py-10 md:py-12"
    >
      <Link
        href="https://www.igani.co"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto flex max-w-md flex-col items-center gap-4 text-center transition-opacity hover:opacity-90"
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Website built by
        </p>
        <Image
          src="/brand/igani-logo.png"
          alt="Igani"
          width={160}
          height={48}
          className="h-10 w-auto object-contain md:h-12"
        />
        <p className="text-sm text-muted-foreground">
          Custom web design & development
        </p>
      </Link>
    </section>
  );
}
