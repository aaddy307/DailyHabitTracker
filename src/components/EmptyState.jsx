"use client";

export default function EmptyState() {
  return (
    <div className="text-center py-16 mt-12">
      <svg
        className="mx-auto mb-4"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 26C20 23.7909 21.7909 22 24 22H56C58.2091 22 60 23.7909 60 26V58C60 60.2091 58.2091 62 56 62H24C21.7909 62 20 60.2091 20 58V26Z"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 33H50"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 43H50"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 52H43"
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="27" cy="33" r="2" fill="var(--text-muted)" />
        <circle cx="27" cy="43" r="2" fill="var(--text-muted)" />
        <circle cx="27" cy="52" r="2" fill="var(--text-muted)" />
      </svg>
      <p className="text-base font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
        No habits yet
      </p>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Add your first habit above to start your streak
      </p>
    </div>
  );
}
