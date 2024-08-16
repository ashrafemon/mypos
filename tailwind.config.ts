import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },
            colors: {
                primary: "#307EF3",
                secondary: "#36405E",
                success: "#0AC074",
                warning: "#FFB821",
                danger: "#FF503D",
            },
        },
    },
    darkMode: "class",
    plugins: [require("tailwind-scrollbar")],
};
export default config;
