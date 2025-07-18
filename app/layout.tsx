require('dotenv').config();
import "../styles/global.css";
import { Metadata } from "next";
import ClientProvider from "./store/ClientProvider"
export const metadata: Metadata = {
  title: "video editor",
  description: "video editor",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <ClientProvider>
          {children}
        </ClientProvider>

      </body>
    </html>
  );
}


