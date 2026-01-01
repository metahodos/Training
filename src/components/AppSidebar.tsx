'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Menu, Lock, CheckCircle2, Circle, Home, BookOpen, Trophy, Link as LinkIcon } from 'lucide-react';
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
    <div className="flex flex-col h-full bg-neutral-950 text-white border-r border-neutral-800">
        {/* Branding Header */}
        <div className="p-6 pb-2">
            <h1 className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 cursor-default">
                Agile Pro Coach
            </h1>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Industrial Edition</span>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 mx-4 mt-2 mb-6 rounded-lg bg-neutral-900 border border-neutral-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-900/20">
                    {userProfile.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <h3 className="font-bold text-sm truncate">{userProfile.name}</h3>
                    <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400 h-5 px-1.5 font-normal">
                        {userProfile.level}
                    </Badge>
                </div>
            </div>
            <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                    <span>XP</span>
                    <span>{userProfile.xp} / {userProfile.nextLevelXp}</span>
                </div>
                <Progress value={(userProfile.xp / userProfile.nextLevelXp) * 100} className="h-1.5 bg-neutral-800 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-blue-500" />
            </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4">
            <div className="mb-6">
                <div className="px-2 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    Menu
                </div>
                <nav className="space-y-1">
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start text-sm font-medium transition-all duration-200",
                                pathname === "/"
                                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
                                    : "text-gray-400 hover:text-white hover:bg-neutral-900"
                            )}
                        >
                            <Home className="mr-3 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>

                </nav>
            </div>

            <div className="mb-6">
                <div className="px-2 mb-2 text-[10px] font-bold text-blue-500/80 uppercase tracking-widest">
                    Percorso Formativo
                </div>
                <nav className="space-y-1">
                    {(modules || []).map((module, index) => {
                        const moduleStatus = moduleStatuses[module.id];
                        const status = moduleStatus?.status || (index === 0 ? 'in_progress' : 'locked');
                        const currentStep = moduleStatus?.currentStep || 'theory';
                        const lockReason = moduleStatus?.lockReason;

                        const isActiveModule = pathname.includes(`/modules/${module.id}`);
                        const isLocked = status === 'locked';
                        const isCompletedModule = status === 'completed';

                        // Logic for sub-step indicators
                        const steps = [
                            { id: 'theory', icon: BookOpen, label: 'Mastery Area' },
                            { id: 'quiz', icon: LinkIcon, label: 'Validazione Tecnica' },
                            { id: 'practice', icon: Trophy, label: 'Scenario Operativo' }
                        ];

                        const getStepStatus = (stepId: string) => {
                            if (isLocked) return 'locked';
                            if (isCompletedModule) return 'completed';

                            if (currentStep === stepId) return 'current';

                            // Check completed steps based on currentStep order
                            if (currentStep === 'quiz' && stepId === 'theory') return 'completed';
                            if (currentStep === 'practice' && (stepId === 'theory' || stepId === 'quiz')) return 'completed';
                            if (currentStep === 'done') return 'completed';

                            return 'pending';
                        };

                        return (
                            <div key={module.id} className={cn("relative group rounded-lg transition-all duration-300", isActiveModule ? "bg-neutral-800/50 pb-2" : "")}>
                                {/* Module Link */}
                                <Link href={isLocked ? '#' : `/modules/${module.id}`}>
                                    <Button
                                        variant="ghost"
                                        disabled={isLocked}
                                        className={cn(
                                            "w-full justify-start text-sm h-auto py-3 mb-1",
                                            isActiveModule ? "text-white font-semibold" : "text-gray-400 hover:text-white hover:bg-neutral-800",
                                            isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                        )}
                                    >
                                        <div className="flex items-center w-full">
                                            <div
                                                className={cn("mr-3 p-1.5 rounded-md transition-colors",
                                                    status === 'completed' ? "bg-green-500/20 text-green-500" :
                                                        status === 'locked' ? "bg-neutral-800 text-neutral-600" :
                                                            "bg-blue-600/20 text-blue-500"
                                                )}
                                                title={isLocked ? (lockReason || "Complete previous module to unlock") : ""}
                                            >
                                                {status === 'locked' ? <Lock className="w-4 h-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
                                            </div>
                                            <span className="truncate flex-1">{module.title}</span>
                                        </div>
                                    </Button>
                                </Link>

                                {/* Sub-steps Visualization */}
                                {!isLocked && (
                                    <div className="flex items-center justify-between px-4 pl-12 gap-1 opacity-80 hover:opacity-100 transition-opacity">
                                        {steps.map((step, idx) => {
                                            const stepStatus = getStepStatus(step.id);
                                            let icon = <Circle className="w-3 h-3" />;
                                            let colorClass = "text-neutral-700";

                                            if (stepStatus === 'completed') {
                                                icon = <CheckCircle2 className="w-3.5 h-3.5" />;
                                                colorClass = "text-green-500";
                                            } else if (stepStatus === 'current') {
                                                icon = <Circle className="w-3.5 h-3.5 fill-blue-500 text-blue-500 animate-pulse" />;
                                                colorClass = "text-blue-500";
                                            }

                                            return (
                                                <div key={step.id} className="flex items-center gap-2" title={step.label}>
                                                    <div className={cn("flex items-center justify-center transition-colors", colorClass)}>
                                                        {icon}
                                                    </div>
                                                    {/* Connector Line */}
                                                    {idx < steps.length - 1 && (
                                                        <div className={cn("h-0.5 w-6 rounded-full transition-colors",
                                                            stepStatus === 'completed' ? "bg-green-500/30" : "bg-neutral-800"
                                                        )} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </ScrollArea>

        {/* Footer Info */}
        <div className="p-4 border-t border-neutral-800 text-[10px] text-neutral-600 text-center">
            v1.0.0 • Industrial Ed.
        </div>
    </div>
);

export function AppSidebar({ userProfile, moduleStatuses, modules }: AppSidebarProps) {
    const pathname = usePathname();

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
