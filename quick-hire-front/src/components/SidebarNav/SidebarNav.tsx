"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, PlusCircle, Users } from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-semibold text-sm ${
        isActive
          ? "bg-primary text-white shadow-md shadow-primary/20"
          : "text-zinc-600 hover:text-primary hover:bg-zinc-50"
      }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      {label}
    </Link>
  );
};

const SidebarNav: React.FC = () => {
  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/jobs", icon: Briefcase, label: "Manage Jobs" },
    { href: "/dashboard/jobs/create", icon: PlusCircle, label: "Post a Job" },
    { href: "/dashboard/applications", icon: Users, label: "Applications" },
  ];

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
};

export default SidebarNav;
