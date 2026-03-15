'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import {
    Bell,
    Search,
    UserCircle,
    Menu,
    LogOut,
    Settings,
    ChevronDown,
    Globe,
    Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Link from 'next/link';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'admin' | 'proponent' | 'scrutiny' | 'mom';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-secondary/20 overflow-hidden font-sans">
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out shrink-0 overflow-hidden`}>
                <Sidebar role={role} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="h-16 flex items-center justify-between px-6 bg-card border-b shadow-sm shrink-0">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-lg border">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search applications..."
                                className="bg-transparent border-none text-sm focus:outline-none w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                            <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">System Online</span>
                        </div>

                        <ThemeToggle />

                        <DropdownMenu>
                            <DropdownMenuTrigger className="relative text-muted-foreground flex items-center justify-center p-2 hover:bg-accent rounded-md">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>New application submitted</DropdownMenuItem>
                                <DropdownMenuItem>EDS response received</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="h-8 w-px bg-border mx-1" />

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-3 pl-2 cursor-pointer group">
                                <div className="flex flex-col items-end hidden sm:flex">
                                    <span className="text-sm font-bold text-primary leading-none group-hover:text-accent transition-colors">Digital User</span>
                                    <span className="text-[10px] text-muted-foreground uppercase font-medium">{role}</span>
                                </div>
                                <div className="bg-primary/10 p-2 rounded-full border border-primary/20 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                                    <UserCircle className="h-5 w-5 text-primary group-hover:text-accent" />
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2">
                                    <UserCircle className="h-4 w-4" /> Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                    <Settings className="h-4 w-4" /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                    <Globe className="h-4 w-4" /> Language
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                                    <Link href="/login" className="flex items-center gap-2 w-full">
                                        <LogOut className="h-4 w-4" /> Log out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
