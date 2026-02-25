export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-forest)",
        color: "var(--color-sage-light)",
      }}
      className="mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌱</span>
              <span
                className="text-lg font-bold"
                style={{ color: "var(--color-cream)" }}
              >
                Spirio
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-sage)" }}>
              Skandinavisk planteregister med semantisk søk og norske vekstsoner.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--color-sage-light)" }}
            >
              Utforsk
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--color-sage)" }}>
              <li>Flerårige planter</li>
              <li>Sommerblomster</li>
              <li>Skyggetålende</li>
              <li>Pollinatorfavoritter</li>
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--color-sage-light)" }}
            >
              Vekstsoner
            </h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((z) => (
                <span key={z} className="zone-badge">
                  H{z}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs" style={{ color: "var(--color-sage)" }}>
              Norske klimasoner for hage og friland.
            </p>
          </div>
        </div>

        <div
          className="mt-10 pt-6 text-xs text-center"
          style={{
            borderTop: "1px solid var(--color-forest-light)",
            color: "var(--color-sage)",
          }}
        >
          © {new Date().getFullYear()} Spirio — Over 380 planter. Norske vekstsoner. Kjøpslenker.
        </div>
      </div>
    </footer>
  );
}
