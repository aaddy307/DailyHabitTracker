"use client";

import HabitItem from "./HabitItem";
import EmptyState from "./EmptyState";

export default function HabitList({ habits, completedIds, streaks, onToggle, onDelete, isViewingToday }) {
  if (habits.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-4">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isCompleted={completedIds.includes(habit.id)}
          streak={streaks[habit.id]}
          onToggle={() => onToggle(habit.id)}
          onDelete={() => onDelete(habit.id)}
          isViewingToday={isViewingToday}
        />
      ))}
    </div>
  );
}
