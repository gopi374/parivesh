'use client';

import { ExternalLink } from 'lucide-react';

export default function Marquee() {
    const newsItems = [
        "New User Notice: Enterprises registering for ODS for the first time must complete enterprise registration through the “Registration” option.",
        "Workflow for obtaining comments from State Pollution Control Boards (SPCBs) is now live.",
        "The Project Proponent can also apply for the EC/FC/WL/CRZ applications on Parivesh portal using the NSWS website."
    ];

    return (
        <div className="bg-muted/50 border-b overflow-hidden py-3">
            <div className="container mx-auto px-4 md:px-6 flex items-center gap-4">
                <div className="bg-accent text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 shadow-lg shadow-accent/20">
                    News Alert
                </div>
                <div className="overflow-hidden whitespace-nowrap">
                    <div className="inline-block animate-marquee hover:pause whitespace-nowrap">
                        {newsItems.map((item, i) => (
                            <span key={i} className="inline-flex items-center gap-2 mx-8 text-sm font-medium text-primary/80">
                                {item}
                                <ExternalLink className="h-3 w-3 opacity-50" />
                            </span>
                        ))}
                    </div>
                    {/* Repeat for seamless loop */}
                    <div className="inline-block animate-marquee hover:pause whitespace-nowrap">
                        {newsItems.map((item, i) => (
                            <span key={i + 10} className="inline-flex items-center gap-2 mx-8 text-sm font-medium text-primary/80">
                                {item}
                                <ExternalLink className="h-3 w-3 opacity-50" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .hover\:pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
