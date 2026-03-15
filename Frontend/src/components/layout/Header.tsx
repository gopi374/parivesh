'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Leaf,
    Menu,
    X,
    Search,
    Globe,
    UserCircle,
    ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full bg-background border-b shadow-sm">
            {/* 1. Top Bar: Gov Oversight & A11y */}
            <div className="bg-primary text-white py-1.5 text-[10px] md:text-xs">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    {/* <div className="flex items-center gap-2">
                        <Image alt="Indian Flag" src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" width={20} height={12} className="h-3 w-auto" style={{ height: 'auto' }} />
                        <span className="font-medium">भारत सरकार | Government of India</span>
                    </div> */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border-r pr-4 border-white/20">
                            <button className="hover:text-accent transition-colors">A-</button>
                            <button className="hover:text-accent transition-colors font-bold underline">A</button>
                            <button className="hover:text-accent transition-colors">A+</button>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-accent">
                            <Globe className="h-3 w-3" />
                            <span>English</span>
                            <ChevronDown className="h-2 w-2" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Logo Bar: Branding */}
            <div className="border-b bg-white py-4">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
                            <Leaf className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-black tracking-tighter text-primary leading-none">PARIVESH 3.0</span>
                            <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">CPC GREEN Portal</span>
                        </div>
                    </Link>
                    <div className="hidden lg:flex items-center gap-8">
                        <Image alt="LiFE Logo" src="/assets/img/Lifelogo.svg" width={100} height={40} className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                        <Image alt="Azadi Logo" src="/assets/img/azadi-ka-amrit-mahotsav.svg" width={100} height={40} className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                        <Image alt="Emblem" src="/assets/img/Emblem_of_India.svg" width={40} height={40} className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>

            {/* 3. Main Navigation Bar */}
            <div className="sticky top-0 z-50 border-b shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-1 h-full">
                        <Link href="/" className="h-full px-4 flex items-center text-sm font-bold border-b-2 border-primary text-primary hover:bg-muted/50 transition-all">Home</Link>
                        <Link href="/about" className="h-full px-4 flex items-center text-sm font-medium hover:text-primary hover:bg-muted/50 transition-all">About</Link>

                        {/* Dropdowns */}
                        <div className="group relative h-full">
                            <button className="h-full px-4 flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-all">
                                Clearance <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute left-0 top-full hidden group-hover:block w-64 p-2 bg-white rounded-xl shadow-2xl border slide-in-from-top-2 animate-in">
                                <Link href="/clearance/environmental" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">Environmental Clearance</Link>
                                <Link href="/clearance/forest" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">Forest Clearance</Link>
                                <Link href="/clearance/wildlife" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">Wild Life Clearance</Link>
                                <Link href="/clearance/crz" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">CRZ Clearance</Link>
                            </div>
                        </div>

                        <div className="group relative h-full">
                            <button className="h-full px-4 flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-all">
                                Downloads <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute left-0 top-full hidden group-hover:block w-64 p-2 bg-white rounded-xl shadow-2xl border slide-in-from-top-2 animate-in">
                                <Link href="/downloads/rules" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">Acts, Rules & Guidelines</Link>
                                <Link href="/downloads/manuals" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">User Manuals</Link>
                                <Link href="/downloads/technical" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">Technical Documents</Link>
                            </div>
                        </div>

                        <Link href="/contact" className="h-full px-4 flex items-center text-sm font-medium hover:text-primary hover:bg-muted/50 transition-all">Contact</Link>
                        <Link href="/complaint" className="h-full px-4 flex items-center text-sm font-medium hover:text-primary hover:bg-muted/50 transition-all">Complaint</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-muted-foreground"><Search className="h-5 w-5" /></Button>
                            <div className="h-8 w-px bg-border mx-2" />

                            <div className="group relative">
                                <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
                                    <UserCircle className="h-4 w-4" />
                                    Login
                                </Button>
                                <div className="absolute right-0 top-full pt-2 hidden group-hover:block w-56 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-2 bg-white rounded-xl shadow-2xl border">
                                        <Link href="/login" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">Portal Login</Link>
                                        <Link href="#" className="block p-3 text-sm hover:bg-primary/5 rounded-lg font-medium">PARIVESH 1.0 Legacy</Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/register">
                                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">Apply Now</Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="flex items-center gap-4 md:hidden">
                            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t p-4 bg-background slide-in-from-top-1 animate-in">
                    <nav className="flex flex-col gap-4">
                        <Link href="/" className="text-sm font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link href="/about" className="text-sm font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="text-sm font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        <Link href="/complaint" className="text-sm font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>Complaint</Link>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" className="w-full justify-start gap-2 border-primary text-primary">
                                <UserCircle className="h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full bg-primary">Apply Now</Button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
