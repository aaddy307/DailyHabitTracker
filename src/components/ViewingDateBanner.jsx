"use client";

export default function ViewingDateBanner({ viewingDate, onClose }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="mb-4 px-3 py-1.5 rounded-full inline-flex items-center gap-2 text-xs" style={{ 
      background: "var(--accent-dim)", 
      border: "1px solid rgba(110, 231, 183, 0.2)"
    }}>
      <span style={{ color: "var(--text-secondary)" }}>
        Viewing {formatDate(viewingDate)} —
      </span>
      <button
        onClick={onClose}
        className="font-medium transition-opacity hover:opacity-80"
        style={{ color: "var(--accent)" }}
      >
        Back to today
      </button>
    </div>
  );
}
