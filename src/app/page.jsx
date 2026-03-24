"use client";

import { useState, useEffect } from "react";
import { getHabits, saveHabits, getCompletions, saveCompletions, getUsername, saveUsername, getStreaks, saveStreaks } from "../lib/storage";
import { getTodayKey, getYesterdayKey } from "../lib/utils";
import Header from "../components/Header";
import UserGreeting from "../components/UserGreeting";
import AddHabitForm from "../components/AddHabitForm";
import ProgressSummary from "../components/ProgressSummary";
import HabitList from "../components/HabitList";
import CalendarWidget from "../components/CalendarWidget";
import WeekStrip from "../components/WeekStrip";
import MiniStats from "../components/MiniStats";
import ViewingDateBanner from "../components/ViewingDateBanner";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState({});
  const [username, setUsername] = useState("");
  const [streaks, setStreaks] = useState({});
  const [viewingDate, setViewingDate] = useState(getTodayKey());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedHabits = getHabits();
    const loadedCompletions = getCompletions();
    const loadedUsername = getUsername();
    const loadedStreaks = getStreaks();
    setHabits(loadedHabits);
    setCompletions(loadedCompletions);
    setUsername(loadedUsername);
    setStreaks(loadedStreaks);
    setIsLoaded(true);
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveHabits(habits);
    }
  }, [habits, isLoaded]);

  // Save completions to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveCompletions(completions);
    }
  }, [completions, isLoaded]);

  // Save username to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveUsername(username);
    }
  }, [username, isLoaded]);

  // Save streaks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveStreaks(streaks);
    }
  }, [streaks, isLoaded]);

  const handleSaveUsername = (name) => {
    setUsername(name);
  };

  const handleAddHabit = (name, color) => {
    const newHabit = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: name.trim(),
      color: color,
      createdAt: new Date().toISOString(),
    };
    setHabits([...habits, newHabit]);
  };

  const handleToggleComplete = (habitId) => {
    const yesterday = getYesterdayKey();
    const dateCompletions = completions[viewingDate] || [];
    
    const isCurrentlyCompleted = dateCompletions.includes(habitId);
    
    let updatedCompletions;
    let updatedStreaks = { ...streaks };
    
    if (isCurrentlyCompleted) {
      // Unmarking - remove from date's completions
      updatedCompletions = dateCompletions.filter(id => id !== habitId);
      
      // Decrement streak only if viewing today
      if (viewingDate === getTodayKey() && updatedStreaks[habitId]) {
        updatedStreaks[habitId] = {
          ...updatedStreaks[habitId],
          count: Math.max(0, updatedStreaks[habitId].count - 1),
        };
      }
    } else {
      // Marking complete - add to date's completions
      updatedCompletions = [...dateCompletions, habitId];
      
      // Update streak only if viewing today
      if (viewingDate === getTodayKey()) {
        const currentStreak = updatedStreaks[habitId];
        
        if (!currentStreak) {
          updatedStreaks[habitId] = {
            count: 1,
            lastCompleted: viewingDate,
          };
        } else if (currentStreak.lastCompleted === viewingDate) {
          // Already counted today, do nothing
        } else if (currentStreak.lastCompleted === yesterday) {
          updatedStreaks[habitId] = {
            count: currentStreak.count + 1,
            lastCompleted: viewingDate,
          };
        } else {
          updatedStreaks[habitId] = {
            count: 1,
            lastCompleted: viewingDate,
          };
        }
      }
    }
    
    setCompletions({
      ...completions,
      [viewingDate]: updatedCompletions,
    });
    setStreaks(updatedStreaks);
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
    
    // Clean up completions for this habit
    const updatedCompletions = { ...completions };
    Object.keys(updatedCompletions).forEach(date => {
      updatedCompletions[date] = updatedCompletions[date].filter(id => id !== habitId);
    });
    setCompletions(updatedCompletions);
    
    // Clean up streaks for this habit
    const updatedStreaks = { ...streaks };
    delete updatedStreaks[habitId];
    setStreaks(updatedStreaks);
  };

  const handleDateSelect = (dateKey) => {
    setViewingDate(dateKey);
  };

  const handleReturnToToday = () => {
    setViewingDate(getTodayKey());
  };

  const today = getTodayKey();
  const isViewingToday = viewingDate === today;
  const viewingCompletions = completions[viewingDate] || [];
  const todayCompletions = completions[today] || [];
  const completedCount = viewingCompletions.length;
  const totalCount = habits.length;

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Sidebar */}
        <aside className="w-full md:w-[260px] md:sticky md:top-0 md:h-screen md:overflow-y-auto" style={{ background: "var(--bg-sidebar)", borderRight: "1px solid var(--border)" }}>
          <div className="p-6 pb-4">
            {/* App Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex flex-col gap-0.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: "var(--accent)" }} />
                <div className="w-3 h-3 rounded-sm" style={{ background: "var(--accent-orange)" }} />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>
                HABITS
              </span>
            </div>

            <CalendarWidget
              viewingDate={viewingDate}
              completions={completions}
              habits={habits}
              onDateSelect={handleDateSelect}
            />
            
            <WeekStrip
              viewingDate={viewingDate}
              completions={completions}
              habits={habits}
              onDateSelect={handleDateSelect}
            />
            
            <MiniStats
              streaks={streaks}
              completions={completions}
              habits={habits}
              todayCompletedCount={todayCompletions.length}
            />
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-[680px] mx-auto px-10 py-8">
            <Header />
            
            <UserGreeting username={username} onSave={handleSaveUsername} totalHabits={totalCount} />
            
            {!isViewingToday && (
              <ViewingDateBanner
                viewingDate={viewingDate}
                onClose={handleReturnToToday}
              />
            )}
            
            <ProgressSummary completed={completedCount} total={totalCount} />
            
            <AddHabitForm onAdd={handleAddHabit} disabled={!isViewingToday} />
            
            <HabitList
              habits={habits}
              completedIds={viewingCompletions}
              streaks={streaks}
              onToggle={handleToggleComplete}
              onDelete={handleDeleteHabit}
              isViewingToday={isViewingToday}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
