// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',  // 这里确保 tailwind 能识别 `--background` 变量
        foreground: 'var(--foreground)', // 这里确保 tailwind 能识别 `--foreground` 变量
      },
    },
  },
  plugins: [],
}
