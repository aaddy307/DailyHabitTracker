"use client";

export default function Header() {
  const getFullDate = () => {
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="flex items-center justify-end pb-4 mb-6" style={{ borderBottom: "1px solid var(--border)" }}>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{getFullDate()}</p>
    </div>
  );
}
