export function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export function getGreeting(name) {
  const hour = new Date().getHours();
  let timeOfDay = "evening";
  
  if (hour < 12) {
    timeOfDay = "morning";
  } else if (hour < 17) {
    timeOfDay = "afternoon";
  }
  
  return `Good ${timeOfDay}, ${name} 👋`;
}

export function getFormattedDate() {
  const date = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

export function getYesterdayKey() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

export function getWeekDays(dateStr) {
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);

  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push({
      dateKey: day.toISOString().split("T")[0],
      dayName: dayNames[i],
      date: day.getDate(),
    });
  }

  return days;
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
