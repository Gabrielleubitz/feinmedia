const items = ["Fast Cuts", "Social Ready", "4K", "Vertical Content"];

export function MarqueeSection() {
  // Duplicate the list so the marquee can loop seamlessly
  const loop = [...items, ...items, ...items, ...items];

  return (
    <section className="overflow-hidden border-y border-border bg-primary py-5">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...loop, ...loop].map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="px-4 text-xl font-semibold uppercase tracking-tight text-primary-foreground sm:px-6 sm:text-2xl md:text-3xl">
              {item}
            </span>
            <span className="text-primary-foreground/50">/</span>
          </div>
        ))}
      </div>
    </section>
  );
}
