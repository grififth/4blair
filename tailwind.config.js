/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        button: "var(--button)",
        text: "var(--text)",
        textbutton: "var(--textbutton)",
        texttitle: "var(--texttitle)",
        placeholder: "var(--placeholder)",
        shadow: "var(--shadow)",
        border: "var(--border)",
        danger: "var(--danger)",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
  darkMode: "media",
};
