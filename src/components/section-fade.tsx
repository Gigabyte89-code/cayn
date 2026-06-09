/**
 * Soft gradient divider that blends adjacent sections into the background.
 * Place between <section> blocks to avoid hard visual breaks.
 */
export function SectionFade({ height = 220 }: { height?: number }) {
  const overlap = Math.round(height * 0.72);

  return (
    <div
      aria-hidden
      className="pointer-events-none relative w-full"
      style={{
        height,
        marginTop: -overlap,
        marginBottom: -overlap,
        background:
          "radial-gradient(110% 80% at 50% 50%, color-mix(in oklab, var(--glow) 10%, transparent) 0%, transparent 58%), linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--background) 16%, transparent) 18%, color-mix(in oklab, var(--background) 74%, transparent) 50%, color-mix(in oklab, var(--background) 16%, transparent) 82%, transparent 100%)",
      }}
    />
  );
}
