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
                    <source src="/assets/img/homevideo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md slide-in-from-left animate-in duration-700">
                            <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse mr-2.5" />
                            Environmental Digital Transformation
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] slide-in-from-left animate-in duration-1000">
                            Sustainable <br />
                            <span className="text-accent underline decoration-8 underline-offset-12">Governance</span> <br />
                            For A Green India
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed slide-in-from-left animate-in duration-1000 delay-300 font-medium italic">
                            The single window hub for Environment, Forest, Wildlife, and CRZ clearances. Driving transparency and efficiency in every approval.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 pt-8 slide-in-from-left animate-in duration-1000 delay-500">
                            <Link href="/register">
                                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white border-none h-16 px-10 text-xl rounded-2xl gap-3 shadow-[0_20px_50px_rgba(234,179,8,0.3)] group hover:scale-105 transition-all">
                                    Apply for Clearance
                                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/dashboard/proponent/track">
                                <Button size="lg" variant="outline" className="h-16 px-10 text-xl bg-white/5 rounded-2xl gap-3 border-white/40 text-white hover:bg-white/10 transition-all backdrop-blur-md group hover:scale-105">
                                    <Search className="h-6 w-6 group-hover:scale-110 transition-transform" />
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
