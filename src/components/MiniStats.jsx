"use client";

export default function MiniStats({ streaks, completions, habits, todayCompletedCount }) {
  const bestStreak = Math.max(0, ...Object.values(streaks).map(s => s.count || 0));
  
  const getThisWeekTotal = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    let total = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateKey = date.toISOString().split("T")[0];
      const dayCompletions = completions[dateKey] || [];
      total += dayCompletions.length;
    }
    return total;
  };

  const thisWeekTotal = getThisWeekTotal();
  const todayTotal = habits.length;

  const stats = [
    { icon: "🔥", label: "Best Streak", value: bestStreak },
    { icon: "✅", label: "This Week", value: thisWeekTotal },
    { icon: "📊", label: "Today", value: `${todayCompletedCount} / ${todayTotal}` },
  ];

  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>
        OVERVIEW
      </h3>
      <div>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2.5"
            style={{ 
              borderBottom: index < stats.length - 1 ? "1px solid var(--border-light)" : "none"
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{stat.icon}</span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {stat.label}
              </span>
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
