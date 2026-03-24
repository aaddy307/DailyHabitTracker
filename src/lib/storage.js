export function getHabits() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("habits");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading habits:", error);
    return [];
  }
}

export function saveHabits(habits) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("habits", JSON.stringify(habits));
  } catch (error) {
    console.error("Error saving habits:", error);
  }
}

export function getCompletions() {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem("completions");
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading completions:", error);
    return {};
  }
}

export function saveCompletions(completions) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("completions", JSON.stringify(completions));
  } catch (error) {
    console.error("Error saving completions:", error);
  }
}

export function getUsername() {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("username") || "";
  } catch (error) {
    console.error("Error reading username:", error);
    return "";
  }
}

export function saveUsername(username) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("username", username);
  } catch (error) {
    console.error("Error saving username:", error);
  }
}

export function getStreaks() {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem("streaks");
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading streaks:", error);
    return {};
  }
}

export function saveStreaks(streaks) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("streaks", JSON.stringify(streaks));
  } catch (error) {
    console.error("Error saving streaks:", error);
  }
}
