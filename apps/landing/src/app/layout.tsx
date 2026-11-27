import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { strings } from "../strings";
import "./globals.css";

export const metadata: Metadata = {
  title: strings.meta.title,
  description: strings.meta.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f5f5b",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
