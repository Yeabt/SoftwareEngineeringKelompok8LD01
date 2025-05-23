// app/dashboard/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Sidebar from "@/components/sidebar"; // create this
import DashboardHeader from "@/components/dashboardheader"; // optional

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartSpend Dashboard",
  description: "Manage your budget with SmartSpend AI.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 bg-gray-100">
            <DashboardHeader />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
