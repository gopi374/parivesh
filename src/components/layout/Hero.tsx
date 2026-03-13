import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Play, Info } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full min-h-[600px] flex items-center overflow-hidden bg-primary overflow-hidden">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-30"
                >
                    <source src="https://parivesh.nic.in/assests/img/homevideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm slide-in-from-left animate-in duration-700">
                            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse mr-2" />
                            Environmental Digital Transformation
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] slide-in-from-left animate-in duration-1000">
                            Sustainable <br />
                            <span className="text-accent underline decoration-4 underline-offset-8">Governance</span> <br />
                            For A Green India
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed slide-in-from-left animate-in duration-1000 delay-300">
                            The single window hub for Environment, Forest, Wildlife, and CRZ clearances. Driving transparency and efficiency in every approval.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 slide-in-from-left animate-in duration-1000 delay-500">
                            <Link href="/register">
                                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white border-none h-14 px-8 text-lg rounded-2xl gap-2 shadow-2xl shadow-accent/40 group">
                                    Apply for Clearance
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/dashboard/proponent/track">
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-primary rounded-2xl gap-2 border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                                    <Search className="h-5 w-5" />
                                    Track Status
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
