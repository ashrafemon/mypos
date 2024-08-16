import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../styles/globals.css";
import { colorsTuple, createTheme, MantineProvider } from "@mantine/core";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const theme = createTheme({
    fontFamily: outfit.style.fontFamily,
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                <MantineProvider theme={theme} withCssVariables>
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
