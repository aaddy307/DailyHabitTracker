import "./globals.css";

export const metadata = {
  title: "Habit Tracker",
  description: "A simple daily habit tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
