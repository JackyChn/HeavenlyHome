import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Havenly Services",
  description:
    "From cleaning and maintenance to repairs and beyond, with our skills, build your heaven.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
