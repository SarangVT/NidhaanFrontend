"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiHome, FiCalendar, FiStar, FiGift, FiSettings} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const navItems = [
  { name: "Dashboard", href: "/doctors/dashboard", icon: <FiHome /> },
  { name: "Appointments", href: "/doctors/dashboard/appointments", icon: <FiCalendar /> },
  { name: "Patient Feedbacks", href: "/doctors/dashboard/feedbacks", icon: <FiStar /> },
  { name: "Earnings", href: "/doctors/dashboard/earnings", icon: <FaRupeeSign /> },
  { name: "Offers", href: "/doctors/dashboard/offers", icon: <FiGift /> },
  { name: "Settings", href: "/doctors/dashboard/settings", icon: <FiSettings /> },
];

export default function DashboardLayout({children,}: { children: React.ReactNode;}) {
  const [menuOpen, setMenuOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
        <aside
            className={`${
            menuOpen ? "w-64" : "w-20"
            } bg-teal-600 text-white transition-all duration-200 flex flex-col`}
        >
        <div className="flex items-center w-full mb-6 px-4">
            <button onClick={() => setMenuOpen(!menuOpen)} className="mr-3"><FiMenu size={24} /></button>
        </div>
        <nav className="flex-1 px-2 mt-4 space-y-2">
            {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg py-2 text-sm font-bold transition-colors
                    ${active
                        ? "bg-white text-teal-700"
                        : "text-teal-100 hover:bg-teal-500 hover:text-white"
                    }`}
                    style={{ width: menuOpen ? "100%" : "fit-content", padding: menuOpen ? "0.5rem 0.75rem" : "0.75rem" }}
                >
                    <span className="text-lg">{item.icon}</span>
                    {menuOpen && <span>{item.name}</span>}
                </Link>
                );
            })}
        </nav>

      </aside>
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
