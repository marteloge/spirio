"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import PlantCard from "@/components/PlantCard";
import ZonePicker from "@/components/ZonePicker";
import { mockPlants, searchPlants } from "@/data/mock-plants";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState<number | null>(null);

  const results = useMemo(() => {
    return searchPlants(query, zone);
  }, [query, zone]);

  const hasSearch = query.trim().length > 0 || zone !== null;

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{
          background:
            "linear-gradient(160deg, var(--color-forest) 0%, var(--color-forest-light) 50%, var(--color-moss) 100%)",
        }}
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: "rgba(122,158,126,0.25)",
              color: "var(--color-sage-light)",
              border: "1px solid rgba(122,158,126,0.4)",
            }}
          >
            <span>🌿</span>
            Over 380 planter. Norske vekstsoner. Kjøpslenker.
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{ color: "var(--color-cream)" }}
          >
            Finn din neste plante
          </h1>

          {/* Subtext */}
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--color-sage-light)" }}
          >
            Søk semantisk — skriv &ldquo;rosa blomster som tåler skygge&rdquo; og finn
            planter som passer din hage og norsk klima.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={setQuery} />
          </div>

          {/* Example queries */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[
              "skyggetålende",
              "duftende blomster",
              "pollinatorer",
              "tørketålende",
            ].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="px-3 py-1 rounded-full text-sm transition-colors hover:opacity-80"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "var(--color-sage-light)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-forest)" }}
            >
              {hasSearch
                ? results.length === 0
                  ? "Ingen treff"
                  : `${results.length} plante${results.length !== 1 ? "r" : ""} funnet`
                : "Utvalgte planter"}
            </h2>
            {hasSearch && query && (
              <p className="text-sm mt-0.5" style={{ color: "var(--color-sage)" }}>
                Søk: &ldquo;{query}&rdquo;
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ZonePicker selectedZone={zone} onChange={setZone} />
            {hasSearch && (
              <button
                onClick={() => {
                  setQuery("");
                  setZone(null);
                }}
                className="text-sm underline transition-opacity hover:opacity-70"
                style={{ color: "var(--color-sage)" }}
              >
                Nullstill
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌱</div>
            <p
              className="text-lg font-medium"
              style={{ color: "var(--color-forest)" }}
            >
              Ingen planter matcher søket ditt
            </p>
            <p className="text-sm mt-2" style={{ color: "var(--color-sage)" }}>
              Prøv et annet søkeord eller juster vekstsonen.
            </p>
          </div>
        )}
      </section>

      {/* ── Stats bar ── */}
      <section
        className="py-12"
        style={{ backgroundColor: "var(--color-cream-dark)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "380+", label: "Planter i databasen" },
              { value: "H1–H8", label: "Norske vekstsoner" },
              { value: "Semantisk", label: "Søketeknologi" },
            ].map(({ value, label }) => (
              <div key={label}>
                <dt
                  className="text-3xl font-bold"
                  style={{ color: "var(--color-forest)" }}
                >
                  {value}
                </dt>
                <dd
                  className="text-sm mt-1"
                  style={{ color: "var(--color-sage)" }}
                >
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
