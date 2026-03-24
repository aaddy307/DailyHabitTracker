"use client";

import { useState } from "react";
import { getGreeting } from "../lib/utils";

export default function UserGreeting({ username, onSave, totalHabits }) {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(username);

  const handleSave = () => {
    const trimmed = input.trim();
    if (trimmed) {
      onSave(trimmed);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  if (!username && !isEditing) {
    return (
      <div className="mb-8 p-6 rounded-lg" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <p className="text-base mb-4" style={{ color: "var(--text-primary)" }}>What's your name?</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your name"
            className="flex-1 px-4 py-2 text-sm rounded-lg focus:outline-none"
            style={{ 
              background: "var(--bg-input)", 
              border: "1px solid var(--border)",
              color: "var(--text-primary)"
            }}
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "#0f0f0f" }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="mb-8">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 text-xl font-semibold rounded-lg focus:outline-none"
            style={{ 
              background: "var(--bg-input)", 
              border: "1px solid var(--border)",
              color: "var(--text-primary)"
            }}
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "#0f0f0f" }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
          {getGreeting(username)}
        </h2>
        <button
          onClick={() => setIsEditing(true)}
          className="transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
          aria-label="Edit name"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        You have {totalHabits} {totalHabits === 1 ? "habit" : "habits"} today
      </p>
    </div>
  );
}
