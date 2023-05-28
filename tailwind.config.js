/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                shade: {
                    100: "#f1f1f1",
                    200: "#d4d4d4",
                    300: "#b8b8b8",
                    400: "#9c9c9c",
                    500: "#808080",
                    600: "#636363",
                    700: "#474747",
                    800: "#2a2a2a",
                    900: "#0e0e0e",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
}
