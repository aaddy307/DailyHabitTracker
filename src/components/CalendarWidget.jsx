"use client";

import { useState } from "react";

export default function CalendarWidget({ viewingDate, completions, habits, onDateSelect }) {
  const today = new Date().toISOString().split("T")[0];
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date(viewingDate);
    return { year: date.getFullYear(), month: date.getMonth() };
  });

  const daysInMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.year, currentMonth.month, 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  const getDateKey = (day) => {
    const year = currentMonth.year;
    const month = String(currentMonth.month + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  const getCompletionStatus = (dateKey) => {
    const dayCompletions = completions[dateKey] || [];
    if (dayCompletions.length === 0) return "none";
    if (dayCompletions.length === habits.length && habits.length > 0) return "all";
    return "some";
  };

  const isFutureDate = (day) => {
    const dateKey = getDateKey(day);
    return dateKey > today;
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = getDateKey(day);
    const isToday = dateKey === today;
    const isSelected = dateKey === viewingDate;
    const isFuture = isFutureDate(day);
    const status = getCompletionStatus(dateKey);

    days.push(
      <button
        key={day}
        onClick={() => !isFuture && onDateSelect(dateKey)}
        disabled={isFuture}
        className="aspect-square flex flex-col items-center justify-center text-xs relative rounded-full transition-colors"
        style={{
          background: isToday && !isSelected
            ? "var(--accent)"
            : isSelected
            ? "transparent"
            : "transparent",
          color: isToday && !isSelected
            ? "#0f0f0f"
            : isFuture
            ? "var(--text-muted)"
            : "var(--text-primary)",
          border: isSelected ? "1px solid var(--accent)" : "1px solid transparent",
          cursor: isFuture ? "not-allowed" : "pointer",
          fontWeight: isToday || isSelected ? "600" : "400"
        }}
        onMouseEnter={(e) => {
          if (!isFuture && !isToday && !isSelected) {
            e.currentTarget.style.background = "var(--bg-card-hover)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isFuture && !isToday && !isSelected) {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        <span>{day}</span>
        {!isFuture && status !== "none" && (
          <div
            className="absolute bottom-1 w-1 h-1 rounded-full"
            style={{
              background: status === "all" ? "var(--accent)" : "var(--accent)",
              opacity: status === "all" ? 1 : 0.5
            }}
          />
        )}
      </button>
    );
  }

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {monthNames[currentMonth.month]} {currentMonth.year}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="p-1 rounded transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            aria-label="Previous month"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-1 rounded transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            aria-label="Next month"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="text-xs text-center font-medium" style={{ color: "var(--text-muted)" }}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
}
