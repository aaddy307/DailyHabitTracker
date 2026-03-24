"use client";

export default function ProgressSummary({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-6">
      <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
        {completed} / {total} completed
      </p>
      <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div
          className="h-full transition-all duration-400 ease-out rounded-full"
          style={{ 
            width: `${percentage}%`,
            background: "var(--accent)"
          }}
        />
      </div>
    </div>
  );
}
