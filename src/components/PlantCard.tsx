import Link from "next/link";
import { Plant } from "@/data/mock-plants";

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <article
      className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
      style={{ backgroundColor: "white", border: "1px solid var(--color-cream-dark)" }}
    >
      {/* Image placeholder — coloured gradient */}
      <div
        className="h-44 w-full relative flex items-end p-4"
        style={{
          background: `linear-gradient(135deg, ${plant.imageColor}cc 0%, ${plant.imageColor}55 60%, var(--color-forest)22 100%)`,
        }}
        aria-hidden="true"
      >
        {/* Decorative leaf pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`leaf-${plant.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <ellipse cx="20" cy="20" rx="8" ry="14" fill="var(--color-forest)" transform="rotate(-30 20 20)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#leaf-${plant.id})`} />
          </svg>
        </div>

        {/* Zone badges overlaid on image */}
        <div className="relative flex flex-wrap gap-1">
          {plant.hardiness_zones.map((z) => (
            <span key={z} className="zone-badge text-xs">
              H{z}
            </span>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h2
            className="text-lg font-bold leading-tight"
            style={{ color: "var(--color-forest)" }}
          >
            {plant.name_no}
          </h2>
          <p
            className="text-sm italic mt-0.5"
            style={{ color: "var(--color-sage)" }}
          >
            {plant.name_latin}
          </p>
        </div>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "#4a5568" }}
        >
          {plant.description.length > 120
            ? plant.description.slice(0, 120) + "…"
            : plant.description}
        </p>

        {/* Use case badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {plant.cut_flower && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "#fce7f3", color: "#9d174d" }}
            >
              ✂️ snittblomst
            </span>
          )}
          {plant.attracts_pollinators && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "#fef9c3", color: "#854d0e" }}
            >
              🐝 pollinatorer
            </span>
          )}
          {plant.drought_tolerant && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "#e0f2fe", color: "#0c4a6e" }}
            >
              💧 tørketålende
            </span>
          )}
          {plant.scent !== "ingen" && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "#f3e8ff", color: "#6b21a8" }}
            >
              🌸 duftende
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-5">
          <Link
            href={`/plant/${plant.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
            style={{ color: "var(--color-moss)" }}
          >
            Se mer
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
