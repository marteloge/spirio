"use client";

interface ZonePickerProps {
  selectedZone: number | null;
  onChange: (zone: number | null) => void;
}

export default function ZonePicker({ selectedZone, onChange }: ZonePickerProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    onChange(val === "" ? null : parseInt(val, 10));
  }

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="zone-picker"
        className="text-sm font-medium whitespace-nowrap"
        style={{ color: "var(--color-forest)" }}
      >
        Vekstsone:
      </label>
      <select
        id="zone-picker"
        value={selectedZone ?? ""}
        onChange={handleChange}
        className="px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors cursor-pointer appearance-none pr-8"
        style={{
          backgroundColor: "white",
          borderColor: "var(--color-sage-light)",
          color: "var(--color-forest)",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237a9e7e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.5rem center",
          backgroundSize: "1.25rem",
        }}
      >
        <option value="">Alle soner</option>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((z) => (
          <option key={z} value={z}>
            H{z}
          </option>
        ))}
      </select>
    </div>
  );
}
