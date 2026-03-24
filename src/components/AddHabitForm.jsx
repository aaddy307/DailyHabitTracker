"use client";

import { useState } from "react";

const COLORS = [
  { name: "slate", bg: "#64748b" },
  { name: "rose", bg: "#f43f5e" },
  { name: "amber", bg: "#f59e0b" },
  { name: "emerald", bg: "#10b981" },
  { name: "sky", bg: "#0ea5e9" },
  { name: "violet", bg: "#8b5cf6" },
];

export default function AddHabitForm({ onAdd, disabled }) {
  const [input, setInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("slate");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    const trimmed = input.trim();
    if (trimmed) {
      onAdd(trimmed, selectedColor);
      setInput("");
      setSelectedColor("slate");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {disabled && (
        <div className="mb-3 text-xs px-3 py-2 rounded-full" style={{ 
          background: "var(--accent-dim)", 
          border: "1px solid rgba(110, 231, 183, 0.2)",
          color: "var(--accent)"
        }}>
          Viewing past date — Back to today to add habits
        </div>
      )}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new habit..."
          disabled={disabled}
          className="flex-1 h-11 px-4 text-sm rounded-lg focus:outline-none transition-colors"
          style={{ 
            background: disabled ? "var(--bg-card)" : "var(--bg-input)",
            border: `1px solid ${disabled ? "var(--border)" : "var(--border)"}`,
            color: "var(--text-primary)",
            cursor: disabled ? "not-allowed" : "text"
          }}
          onFocus={(e) => !disabled && (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => e.target.style.borderColor = "var(--border)"}
        />
        <button
          type="submit"
          disabled={disabled}
          className="h-11 px-5 text-sm font-semibold rounded-lg transition-opacity"
          style={{ 
            background: disabled ? "var(--border)" : "var(--accent)",
            color: disabled ? "var(--text-muted)" : "#0f0f0f",
            cursor: disabled ? "not-allowed" : "pointer"
          }}
          onMouseEnter={(e) => !disabled && (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => e.target.style.opacity = "1"}
        >
          Add
        </button>
      </div>
      {!disabled && (
        <div className="flex gap-2 items-center">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Color</span>
          {COLORS.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setSelectedColor(color.name)}
              className="w-5 h-5 rounded-full transition-transform"
              style={{ 
                background: color.bg,
                outline: selectedColor === color.name ? `2px solid var(--accent)` : "none",
                outlineOffset: "2px",
                transform: selectedColor === color.name ? "scale(1.1)" : "scale(1)"
              }}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      )}
    </form>
  );
}
