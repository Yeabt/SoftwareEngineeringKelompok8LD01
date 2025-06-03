// app/dashboard/layout.tsx
import Providers from '@/app/providers';
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
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <Providers> {/* Wrap your layout with Providers */}
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 bg-gray-100">
            <DashboardHeader />
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </Providers>
    </div>
  );
}
