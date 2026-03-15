import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const announcements = [
    {
        date: 'March 12, 2026',
        title: 'Revised guidelines for Environmental Impact Assessment (EIA) for Mining Projects',
        category: 'Notification',
        urgent: true,
    },
    {
        date: 'March 10, 2026',
        title: 'New module for Wildlife Clearance (WC) applications launched on PARIVESH 3.0',
        category: 'System Update',
        urgent: false,
    },
    {
        date: 'March 08, 2026',
        title: 'Public Hearing scheduled for Highway Project NH-44 on March 25th in Nagpur',
        category: 'Public Notice',
        urgent: false,
    },
    {
        date: 'March 05, 2026',
        title: 'Reminder: All proponents must update their company profiles by March 31st',
        category: 'Advisory',
        urgent: true,
    },
];

export default function Announcements() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Announcements List */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between pb-4 border-b">
                            <div className="flex items-center gap-3">
                                <div className="bg-accent/10 p-2 rounded-lg text-accent">
                                    <Bell className="h-5 w-5" />
                                </div>
                                <h2 className="text-2xl font-bold text-primary">Latest Announcements</h2>
                            </div>
                            <Link href="#" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
                                View All <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {announcements.map((ann, index) => (
                                <div key={index} className="group p-4 rounded-xl border bg-card hover:bg-accent/5 hover:border-accent/30 transition-all">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-muted-foreground">{ann.date}</span>
                                                <Badge variant={ann.urgent ? "destructive" : "secondary"} className="text-[10px] uppercase font-bold py-0">
                                                    {ann.category}
                                                </Badge>
                                            </div>
                                            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                                                {ann.title}
                                            </h3>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Quick Links in Announcements Section */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-lg bg-primary text-white overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <CardHeader>
                                <CardTitle className="text-xl">Help & Support</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                <p className="text-white/80 text-sm">
                                    Facing issues with your application? Our support team is available 24/7 to assist you.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                                            <span className="font-bold">?</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">User Manuals</div>
                                            <div className="text-[10px] text-white/60">Step-by-step guides</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                                            <span className="font-bold">!</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">Raise Ticket</div>
                                            <div className="text-[10px] text-white/60">Submit a query</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-1 rounded-2xl bg-gradient-to-br from-accent to-primary">
                            <div className="bg-background rounded-2xl p-6 space-y-4">
                                <h4 className="font-bold text-primary italic">"Sustainable Development is the pathway to the future we want for all."</h4>
                                <div className="text-xs text-muted-foreground">— Ministry Philosophy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
