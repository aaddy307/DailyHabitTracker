
PROJECT DOCUMENTATION

Daily Habit Tracker

A Minimal, Professional Productivity Web Application

Project Name	Daily Habit Tracker
Technology	Next.js 16, React, Tailwind CSS v4
Language	JavaScript (JSX)
Week 1 Deadline	27 March 2026
Week 2 Deadline	04 April 2026

 
1. Project Name

Daily Habit Tracker

2. Project Description

The Daily Habit Tracker is a modern, minimal web application built with Next.js that enables users to build and maintain positive daily habits. The application focuses on simplicity and clarity — allowing users to add personal habits, mark their daily completion, track streaks, and review past performance through an integrated calendar view.

The application targets students, professionals, and anyone looking to build consistent routines. It operates entirely in the browser with no backend dependency, using localStorage for data persistence, making it fast, private, and offline-capable.

Key Features
•	Add and manage personal habits with custom color labels
•	Mark habits as complete each day with a single click
•	Streak tracking — consecutive day completion per habit
•	Calendar sidebar to navigate and view any past date
•	Weekly strip showing completion indicators for each day
•	Progress bar showing today's completion percentage
•	User profile with personalized greeting (morning/afternoon/evening)
•	Fully persistent data using localStorage — no login required
•	Dark mode professional UI inspired by Linear and Notion
•	Responsive layout — works on desktop and mobile

 
3. Requirements

3.1 Runtime Environment
•	Node.js v18 or higher
•	npm v9 or higher
•	A modern browser (Chrome, Firefox, Edge, Safari)

3.2 Core Technologies
Technology	Version	Purpose
Next.js	16 (latest)	React framework with App Router, SSR support
React	19 (latest)	UI component library, state management
Tailwind CSS	v4 (latest)	Utility-first CSS framework for styling
@tailwindcss/postcss	latest	PostCSS plugin for Tailwind v4 integration
PostCSS	latest	CSS processing and transformation tool
Autoprefixer	latest	Automatic vendor prefix addition

3.3 Project Structure
•	src/app/ — Next.js App Router pages and global CSS
•	src/components/ — All React UI components (.jsx)
•	src/lib/ — Utility functions and localStorage helpers
•	public/ — Static assets
•	next.config.js — Next.js configuration
•	tailwind.config.js — Tailwind CSS configuration
•	postcss.config.js — PostCSS configuration

3.4 Installation & Setup
Run the following commands to set up and start the project:

git clone <repository-url>
cd Daily-Habit-tracker
npm install
npm run dev

 
4. API Information

The Daily Habit Tracker is a fully client-side application and does not use any external APIs or backend services. All data operations are performed using browser-native Web APIs.

4.1 Web Storage API (localStorage)
The primary data persistence mechanism is the browser's localStorage API — a synchronous key-value store available in all modern browsers.

Key	Type	Description
habits	JSON Array	Stores all habits: [{ id, name, color, createdAt }]
completions	JSON Object	Daily completion records: { YYYY-MM-DD: [id1, id2] }
streaks	JSON Object	Streak data: { habitId: { count, lastCompleted } }
username	String	User's display name for personalized greeting

4.2 Browser Date API
The application uses the JavaScript Date API extensively for calendar rendering, streak calculation, and greeting logic. No third-party date libraries are used.
•	new Date() — Get current date and time
•	toISOString().split('T')[0] — Generate YYYY-MM-DD date keys
•	getDay(), getDate(), getMonth(), getFullYear() — Calendar math
•	getHours() — Determine greeting (morning/afternoon/evening)

4.3 crypto.randomUUID()
Unique habit IDs are generated using the browser's built-in crypto.randomUUID() method, which produces RFC 4122 compliant UUIDs without any external dependency.

4.4 Future API Considerations
While the current implementation is fully offline and client-side, the architecture supports future integration with:
•	REST APIs for cloud sync and multi-device support
•	OAuth providers (Google, GitHub) for user authentication
•	Push Notification API for daily habit reminders
•	Service Worker API for full offline PWA support
