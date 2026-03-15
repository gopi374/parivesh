import Marquee from '@/components/layout/Marquee';
import Hero from '@/components/layout/Hero';
import Statistics from '@/components/layout/Statistics';
import Announcements from '@/components/layout/Announcements';
import { ClipboardList, UserCheck, Map, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <Marquee />
            <Hero />

            {/* Quick Links Section */}
            <section className="relative -mt-16 z-20 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Track Your Proposal", icon: ClipboardList, color: "bg-[#1e40af]" },
                            { title: "User Journey", icon: UserCheck, color: "bg-[#f59e0b]" },
                            { title: "Know Your Approval", icon: Map, color: "bg-[#059669]" },
                        ].map((item, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-3xl p-8 bg-white shadow-2xl border hover:border-primary/50 transition-all cursor-pointer">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <item.icon className="h-24 w-24 text-primary" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-primary group-hover:text-accent transition-colors">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Access real-time information regarding your clearance status and journey.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Statistics />
            <Announcements />

            {/* Green Clearance Grid */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">Green Clearance</h2>
                            <p className="text-muted-foreground max-w-xl font-medium italic">Environmental sustainability through transparent digital governance.</p>
                        </div>
                        <div className="w-24 h-1.5 bg-accent rounded-full mb-4 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "Environmental Clearance", img: "/assets/img/gc1.jpg" },
                            { title: "Forest Clearance", img: "/assets/img/gc2.png" },
                            { title: "Wild Life Clearance", img: "/assets/img/gc3.png" },
                            { title: "CRZ Clearance", img: "/assets/img/gc4.png" },
                        ].map((item, i) => (
                            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl transition-all hover:-translate-y-2">
                                <Image 
                                    src={item.img} 
                                    alt={item.title} 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                                    <h3 className="font-bold text-lg leading-tight mb-2">{item.title}</h3>
                                    <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:text-accent">
                                        Explore <ArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Slider */}
            <section className="py-12 border-y bg-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 flex items-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="flex gap-16 animate-infinite-scroll">
                        {['dot', 'cpcb', 'ministryofpower', 'bharatkosh', 'idea4life', 'qci', 'nsws'].map((logo, i) => (
                            <Image 
                                key={i} 
                                src={`/assets/img/${logo}${logo === 'idea4life' ? '.png' : logo === 'qci' ? '.png' : logo === 'nsws' ? '.png' : '.svg'}`} 
                                alt={logo} 
                                width={120} 
                                height={48} 
                                className="h-12 w-auto object-contain shrink-0" 
                                style={{ height: 'auto' }}
                            />
                        ))}
                    </div>
                    {/* Same set for infinite loop */}
                    <div className="flex gap-16 animate-infinite-scroll">
                        {['dot', 'cpcb', 'ministryofpower', 'bharatkosh', 'idea4life', 'qci', 'nsws'].map((logo, i) => (
                            <Image 
                                key={i + 10} 
                                src={`/assets/img/${logo}${logo === 'idea4life' ? '.png' : logo === 'qci' ? '.png' : logo === 'nsws' ? '.png' : '.svg'}`} 
                                alt={logo} 
                                width={120} 
                                height={48} 
                                className="h-12 w-auto object-contain shrink-0" 
                                style={{ height: 'auto' }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
