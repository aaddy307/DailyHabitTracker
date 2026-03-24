"use client";

import { getWeekDays } from "../lib/utils";

export default function WeekStrip({ viewingDate, completions, habits, onDateSelect }) {
  const today = new Date().toISOString().split("T")[0];
  const weekDays = getWeekDays(viewingDate);

  const getCompletionPercentage = (dateKey) => {
    if (habits.length === 0) return 0;
    const dayCompletions = completions[dateKey] || [];
    return Math.round((dayCompletions.length / habits.length) * 100);
  };

  return (
    <div className="mb-5">
      <h3 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
        THIS WEEK
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => {
          const isToday = day.dateKey === today;
          const isSelected = day.dateKey === viewingDate;
          const percentage = getCompletionPercentage(day.dateKey);
          const isFuture = day.dateKey > today;

          return (
            <button
              key={day.dateKey}
              onClick={() => !isFuture && onDateSelect(day.dateKey)}
              disabled={isFuture}
              className="flex flex-col items-center py-2 px-1 rounded-lg transition-colors"
              style={{
                background: isSelected
                  ? "var(--bg-card)"
                  : "transparent",
                border: isSelected ? "1px solid var(--border)" : "1px solid transparent",
                cursor: isFuture ? "not-allowed" : "pointer"
              }}
              onMouseEnter={(e) => {
                if (!isFuture && !isSelected) {
                  e.currentTarget.style.background = "var(--bg-card-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isFuture && !isSelected) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <span className="text-xs font-medium mb-1" style={{ color: isFuture ? "var(--text-muted)" : "var(--text-secondary)" }}>
                {day.dayName.charAt(0)}
              </span>
              <span className="text-xs font-semibold mb-1" style={{ color: isFuture ? "var(--text-muted)" : "var(--text-primary)" }}>
                {day.date}
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: isFuture
                    ? "var(--border)"
                    : percentage === 100
                    ? "var(--accent)"
                    : percentage > 0
                    ? "var(--accent)"
                    : "var(--border)",
                  opacity: isFuture ? 0.3 : percentage > 0 ? 1 : 0.5,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
