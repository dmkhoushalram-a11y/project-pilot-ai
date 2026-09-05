/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0f1c', // Dark navy/indigo
        card: '#111827',
        primary: '#4f46e5',
        secondary: '#1e293b',
      }
    },
  },
  plugins: [],
}
