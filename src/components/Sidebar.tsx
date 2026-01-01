import Link from "next/link";
import { Home, BookOpen, Award, Settings } from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Modules", href: "/", icon: BookOpen }, // Same for now
    { name: "My Badges", href: "/badges", icon: Award },
    { name: "Profile", href: "/profile", icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Agile Mastery
                </h1>
                <p className="text-sm text-gray-500 mt-1">Industrial Edition</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-400 text-center">
                    &copy; 2026 QuickWorks
                </div>
            </div>
        </aside>
    );
}
