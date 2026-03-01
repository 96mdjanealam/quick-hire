"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Exclude Navbar and Footer on dashboard routes
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return null;
  }

  return <>{children}</>;
}
