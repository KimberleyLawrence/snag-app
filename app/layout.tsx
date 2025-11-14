import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

// fontawesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const APP_NAME = "Snag App";
const APP_DESCRIPTION = "Snag App";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - Snag App",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ccc",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mogra&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-teal-500 text-gray-900 ">
        <div className="grid grid-cols-6 ">
          <div className="col-span-6 md:col-span-4 md:col-start-2 ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
