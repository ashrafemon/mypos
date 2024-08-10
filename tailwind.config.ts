import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

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
    plugins: [nextui()],
};
export default config;
