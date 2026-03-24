"use client";

const COLOR_MAP = {
  slate: "#64748b",
  rose: "#f43f5e",
  amber: "#f59e0b",
  emerald: "#10b981",
  sky: "#0ea5e9",
  violet: "#8b5cf6",
};

export default function HabitItem({ habit, isCompleted, streak, onToggle, onDelete, isViewingToday }) {
  const colorHex = COLOR_MAP[habit.color] || COLOR_MAP.slate;
  const streakCount = streak?.count || 0;

  return (
    <div
      className="flex items-center gap-3 py-3 px-4 mb-1.5 rounded-lg transition-all duration-150"
      style={{ 
        background: "var(--bg-card)",
        border: "1px solid var(--border)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--bg-card-hover)";
        e.currentTarget.style.borderColor = "#333";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--bg-card)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* Color bar */}
      <div 
        className="w-0.5 h-5 rounded-sm flex-shrink-0"
        style={{ background: colorHex }}
      />
      
      {/* Custom checkbox */}
      <button
        onClick={onToggle}
        className="flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center transition-all"
        style={{ 
          border: `1.5px solid ${isCompleted ? "var(--accent)" : "var(--border)"}`,
          background: isCompleted ? "var(--accent)" : "transparent"
        }}
        aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
      >
        {isCompleted && (
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="#0f0f0f"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
      
      {/* Habit name */}
      <span
        className="flex-1 text-sm font-medium"
        style={{
          color: isCompleted ? "var(--text-muted)" : "var(--text-primary)",
          textDecoration: isCompleted ? "line-through" : "none"
        }}
      >
        {habit.name}
      </span>
      
      {/* Streak badge */}
      {streakCount > 0 ? (
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ 
            background: "var(--accent-dim)",
            color: "var(--accent-orange)"
          }}
        >
          🔥 {streakCount}
        </span>
      ) : (
        <span
          className="text-xs font-medium px-2 py-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          —
        </span>
      )}
      
      {/* Delete button */}
      <button
        onClick={onDelete}
        disabled={!isViewingToday}
        className="flex-shrink-0 transition-colors ml-3"
        style={{ 
          color: isViewingToday ? "var(--text-muted)" : "var(--border)",
          cursor: isViewingToday ? "pointer" : "not-allowed"
        }}
        onMouseEnter={(e) => isViewingToday && (e.target.style.color = "var(--accent-red)")}
        onMouseLeave={(e) => isViewingToday && (e.target.style.color = "var(--text-muted)")}
        aria-label="Delete habit"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
