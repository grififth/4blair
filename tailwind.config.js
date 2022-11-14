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
                lightbackground: "#f4f5f7",
                darkbackground: "#121212",
                lightforeground: "#FFFFFF",
                darkforeground: "#1f1f1f",
                lighttext: "#000000",
                darktext: "#FFFFFF",
                lightaccent: "#0ea5e9",
                darkaccent: "#8b5cf6",
                lightaccentfaded: "rgba(14, 165, 233, 0.5)",
                darkaccentfaded: "rgba(139, 92, 246, 0.5)",
                danger: "#ff6961",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
