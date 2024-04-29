/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            "desktop-max": { max: "2000px" },
            desktop: { max: "1279px" },
            laptop: { max: "1023px" },
            pad: { max: "767px" },
            mobile: { max: "420px" },
        },
        extend: {
            boxShadow: {
                light: "0 2px 4px rgba(0, 0, 0, 0.07)",
            },
        },
    },
    plugins: [],
}
