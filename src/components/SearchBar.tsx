"use client";

import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col sm:flex-row gap-3"
      role="search"
    >
      <div className="relative flex-1">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5"
            style={{ color: "var(--color-sage)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Søk blant planter..."
          aria-label="Søk blant planter"
          className="search-input w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 transition-colors"
          style={{
            backgroundColor: "white",
            borderColor: "var(--color-sage-light)",
            color: "var(--color-forest)",
          }}
        />
      </div>

      <button
        type="submit"
        className="px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-200 hover:opacity-90 active:scale-95 whitespace-nowrap"
        style={{
          backgroundColor: "var(--color-forest)",
          color: "var(--color-cream)",
        }}
      >
        Søk
      </button>
    </form>
  );
}
