# 📅 Daily Habit Tracker

A minimal, professional habit tracking web application built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Track your daily habits, build streaks, and review your history — all stored privately in your browser with no backend required.

---

## ✨ Features

- ✅ **Add & manage habits** with custom color labels
- ☑️ **Mark habits complete** each day with a single click
- 🔥 **Streak tracking** — consecutive day count per habit
- 📅 **Calendar sidebar** — navigate and view any past date's completions
- 📊 **Progress bar** — real-time daily completion percentage
- 👋 **User profile** — personalized greeting (morning / afternoon / evening)
- 🗓️ **Week strip** — visual completion indicators for each day of the week
- 📈 **Mini stats** — best streak, weekly total, today's progress
- 💾 **No login required** — all data saved in localStorage
- 🌑 **Dark mode UI** — professional Linear-inspired design
- 📱 **Responsive** — works on desktop and mobile

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16 (latest) | React framework with App Router |
| React | 19 (latest) | UI components and state management |
| Tailwind CSS | v4 (latest) | Utility-first styling |
| @tailwindcss/postcss | latest | Tailwind v4 PostCSS integration |
| PostCSS | latest | CSS processing |
| Autoprefixer | latest | Vendor prefix automation |

---

## 📁 Project Structure
```
Daily-Habit-tracker/
├── src/
│   ├── app/
│   │   ├── layout.jsx          # Root layout, font import
│   │   ├── page.jsx            # Main page, state management
│   │   └── globals.css         # Global styles, CSS variables
│   ├── components/
│   │   ├── Header.jsx          # Top bar with app name + date
│   │   ├── UserGreeting.jsx    # Personalized greeting + name edit
│   │   ├── ProgressSummary.jsx # Completion count + progress bar
│   │   ├── AddHabitForm.jsx    # Input + color picker + add button
│   │   ├── HabitList.jsx       # List of all habits
│   │   ├── HabitItem.jsx       # Single habit row with toggle/delete
│   │   ├── EmptyState.jsx      # Empty state illustration
│   │   ├── CalendarWidget.jsx  # Monthly calendar with dot indicators
│   │   ├── WeekStrip.jsx       # 7-day completion strip
│   │   ├── MiniStats.jsx       # Sidebar stats cards
│   │   └── ViewingDateBanner.jsx # Banner when viewing past date
│   └── lib/
│       ├── storage.js          # All localStorage read/write functions
│       └── utils.js            # Date helpers, greeting logic
├── public/
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/aaddy307/DailyHabitTracker

# Navigate into the project
cd DailyHabitTracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`. No account, no server, no tracking.

| Key | Type | Description |
|---|---|---|
| `habits` | JSON Array | `[{ id, name, color, createdAt }]` |
| `completions` | JSON Object | `{ "YYYY-MM-DD": [id1, id2] }` |
| `streaks` | JSON Object | `{ habitId: { count, lastCompleted } }` |
| `username` | String | Your display name |

---

## 🔥 Streak Logic

- Completed **yesterday** → streak increments by 1
- Completed **today already** → no change
- Last completed **before yesterday** → streak resets to 1
- **Unmarked** after marking today → streak decrements by 1 (min 0)

---

## ⚙️ Configuration Files

**postcss.config.js** (required for Tailwind v4):
```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

**globals.css** (Tailwind v4 import):
```css
@import "tailwindcss";
```

**next.config.js**:
```js
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
};
module.exports = nextConfig;
```
---

## 📄 Documentation

- [Project Document](./docs/Daily_Habit_Tracker_Project_Document.docx)
- [Research Paper](./docs/Daily_Habit_Tracker_Research_Paper.docx)

---

## 📜 License

This project is for academic submission purposes.

---

## 👤 Author

Built with Next.js, React, and Tailwind CSS v4.