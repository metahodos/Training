'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Menu, Lock, CheckCircle2, Circle, Home, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';


export interface ModuleStatus {
    moduleId: string;
    status: 'locked' | 'in_progress' | 'completed';
    currentStep: 'theory' | 'quiz' | 'practice' | 'done';
    lockReason?: string;
}

interface AppSidebarProps {
    userProfile: {
        name: string;
        level: string;
        xp: number;
        nextLevelXp: number;
    };
    moduleStatuses: Record<string, ModuleStatus>;
    modules: { id: string; title: string }[];
}

interface SidebarContentProps extends AppSidebarProps {
    pathname: string;
}

const SidebarContent = ({ userProfile, moduleStatuses, pathname, modules }: SidebarContentProps) => (
    <div className="flex flex-col h-full bg-[#020817] text-white border-r border-blue-900/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />
        {/* Branding Header */}
        <div className="p-6 pb-2">
            <h1 className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 cursor-default">
                AGiLETRAINING.AI
            </h1>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">by MetàHodòs</span>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 mx-4 mt-2 mb-6 rounded-lg bg-neutral-900 border border-neutral-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-900/20">
                    {userProfile.name.charAt(0)}
                </div>
                <div>
                    <div className="text-sm font-semibold text-neutral-200">{userProfile.name}</div>
                    <div className="text-[10px] text-neutral-500">{userProfile.level} • {userProfile.xp} XP</div>
                </div>
            </div>
            {/* Level Progress */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>Progress</span>
                    <span>{Math.round((userProfile.xp / userProfile.nextLevelXp) * 100)}%</span>
                </div>
                <Progress value={(userProfile.xp / userProfile.nextLevelXp) * 100} className="h-1 bg-neutral-800" />
            </div>
        </div>

        <ScrollArea className="flex-1 px-4">
            <div className="space-y-6 pb-6">
                {/* Main Navigation */}
                <nav className="space-y-1">
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-3 h-10 transition-all duration-200",
                                pathname === '/'
                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                            )}
                        >
                            <Home className="w-4 h-4" />
                            <span className="font-medium">Dashboard</span>
                        </Button>
                    </Link>
                </nav>

                {/* Modules Navigation */}
                <nav className="space-y-1">
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-semibold">
                        Fasi del Progetto
                    </div>
                    {modules.map((module, index) => {
                        // Check status from props
                        const status = moduleStatuses[module.id]?.status || 'locked';
                        const isLocked = status === 'locked';
                        const isActive = pathname === `/module/${module.id}` || pathname.startsWith(`/module/${module.id}/`);
                        const isCompleted = status === 'completed';

                        // Icon selection
                        const Icon = isLocked ? Lock : (isCompleted ? CheckCircle2 : (isActive ? BookOpen : Circle));

                        return (
                            <div key={module.id} className="relative group">
                                <Link
                                    href={isLocked ? '#' : `/module/${module.id}`}
                                    className={cn(
                                        "block",
                                        isLocked && "cursor-not-allowed"
                                    )}
                                >
                                    <Button
                                        variant="ghost"
                                        disabled={isLocked}
                                        className={cn(
                                            "w-full justify-between h-11 transition-all duration-200 group-hover:pl-5",
                                            isActive
                                                ? "bg-neutral-800 text-white font-medium border-l-2 border-green-500"
                                                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900",
                                            isLocked && "opacity-50 hover:bg-transparent hover:text-neutral-400 hover:pl-4"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={cn(
                                                "w-4 h-4 transition-colors",
                                                isActive ? "text-green-500" : (isCompleted ? "text-green-600" : "text-neutral-600"),
                                            )} />
                                            <span className="truncate max-w-[140px] text-xs">{index}. {module.title}</span>
                                        </div>
                                    </Button>
                                </Link>


                            </div>
                        );
                    })}
                </nav>
            </div>
        </ScrollArea>

        {/* Footer Info */}
        <div className="p-4 border-t border-neutral-800 text-[10px] text-neutral-600 text-center">
            v2.5 • MetàHodòs
        </div>
    </div>
);

export function AppSidebar({ userProfile, moduleStatuses, modules }: AppSidebarProps) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="hidden lg:block fixed left-0 top-0 h-screen w-72 z-40 bg-neutral-900">
                <SidebarContent
                    userProfile={userProfile}
                    moduleStatuses={moduleStatuses}
                    pathname={pathname}
                    modules={modules}
                />
            </div>
        );
    }

    return (
        <>
            {/* Mobile Trigger */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="bg-neutral-900 border-neutral-800">
                            <Menu className="h-5 w-5 text-white" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 border-neutral-800 w-80 bg-neutral-900">
                        <SidebarContent
                            userProfile={userProfile}
                            moduleStatuses={moduleStatuses}
                            pathname={pathname}
                            modules={modules}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed left-0 top-0 h-screen w-72 z-40 bg-neutral-900">
                <SidebarContent
                    userProfile={userProfile}
                    moduleStatuses={moduleStatuses}
                    pathname={pathname}
                    modules={modules}
                />
            </div>
        </>
    );
}
