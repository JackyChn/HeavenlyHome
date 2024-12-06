import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Havenly Home",
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
      <body>
        <div className="mx-6 md:mx-10">{children}</div>
      </body>
    </html>
  );
}
