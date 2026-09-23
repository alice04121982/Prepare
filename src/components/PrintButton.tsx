"use client";

/** Opens the browser's print dialog, which also offers "save as PDF". */
export default function PrintButton({ label = "print this list" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="no-print btn btn-secondary btn-lg">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="flex-none">
        <path d="M4 6V1h10v5M4 13H1V6h16v7h-3M4 10h10v7H4z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      {label}
    </button>
  );
}
