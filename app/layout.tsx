import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Outfit({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div className="mx-6 md:mx-10">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
