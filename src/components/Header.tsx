import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{ backgroundColor: "var(--color-forest)" }}
      className="sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌱</span>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--color-cream)" }}
            >
              Spirio
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--color-sage-light)" }}
            >
              Søk
            </Link>
            <span
              className="text-sm font-medium cursor-not-allowed flex items-center gap-1"
              style={{ color: "var(--color-sage)" }}
              title="Kommer snart"
            >
              Min hage
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: "var(--color-forest-light)",
                  color: "var(--color-sage-light)",
                }}
              >
                snart
              </span>
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
