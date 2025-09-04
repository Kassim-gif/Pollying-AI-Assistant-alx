import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pollying AI Assistant",
  description: "AI-powered polling and voting application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
