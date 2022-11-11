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
                lightbackground: "#FFFFFF",
                darkbackground: "#000000",
                lightforeground: "#F7F7F7",
                darkforeground: "#121212",
                lighttext: "#000000",
                darktext: "#FFFFFF",
                lightaccent: "#0ea5e9",
                darkaccent: "#e26baa",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
