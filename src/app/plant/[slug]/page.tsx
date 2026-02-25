import Link from "next/link";
import { mockPlants } from "@/data/mock-plants";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return mockPlants.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const plant = mockPlants.find((p) => p.slug === slug);
  if (!plant) return { title: "Plante ikke funnet — Spirio" };
  return {
    title: `${plant.name_no} (${plant.name_latin}) — Spirio`,
    description: plant.description,
  };
}

export default async function PlantPage({ params }: Props) {
  const { slug } = await params;
  const plant = mockPlants.find((p) => p.slug === slug);

  if (!plant) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
        style={{ color: "var(--color-sage)" }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Tilbake til søk
      </Link>

      {/* Image placeholder */}
      <div
        className="w-full h-64 rounded-3xl mb-8 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${plant.imageColor}cc 0%, ${plant.imageColor}44 100%)`,
        }}
        aria-hidden="true"
      >
        <span className="text-8xl opacity-20">🌿</span>
      </div>

      {/* Plant name */}
      <div className="mb-6">
        <h1
          className="text-4xl font-bold"
          style={{ color: "var(--color-forest)" }}
        >
          {plant.name_no}
        </h1>
        <p
          className="text-lg italic mt-1"
          style={{ color: "var(--color-sage)" }}
        >
          {plant.name_latin}
        </p>
      </div>

      {/* Zones */}
      <div className="mb-6 flex flex-wrap gap-2">
        {plant.hardiness_zones.map((z) => (
          <span key={z} className="zone-badge">
            H{z}
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        className="text-base leading-relaxed mb-8"
        style={{ color: "#374151" }}
      >
        {plant.description}
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-10">
        {plant.categories.map((cat) => (
          <span
            key={cat}
            className="text-sm px-3 py-1 rounded-full capitalize font-medium"
            style={{
              backgroundColor: "var(--color-cream-dark)",
              color: "var(--color-forest)",
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Coming soon card */}
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          backgroundColor: "var(--color-cream-dark)",
          border: "2px dashed var(--color-sage-light)",
        }}
      >
        <div className="text-4xl mb-4">🌱</div>
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "var(--color-forest)" }}
        >
          Detaljside kommer snart
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-sage)" }}>
          Her vil du finne dypdykk i plantepleie, norske leverandører, kjøpslenker
          og tips for din vekstsone.
        </p>
        <Link
          href="/"
          className="inline-block mt-5 px-6 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--color-forest)",
            color: "var(--color-cream)",
          }}
        >
          Utforsk flere planter
        </Link>
      </div>
    </div>
  );
}
