/**
 * Soft gradient divider that blends adjacent sections into the background.
 * Place between <section> blocks to avoid hard visual breaks.
 */
export function SectionFade({ height = 120 }: { height?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative w-full"
      style={{
        height,
        background:
          "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--background) 60%, transparent) 50%, var(--background) 100%)",
      }}
    />
  );
}
