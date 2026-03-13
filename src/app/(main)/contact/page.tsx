import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter">Contact Us</h1>
                            <p className="text-muted-foreground">We are here to help you with your environmental clearance journey.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: MapPin, title: "Our Office", detail: "Indira Paryavaran Bhawan, Jor Bagh Road, New Delhi - 110003" },
                                { icon: Phone, title: "Support Line", detail: "+91-11-20819172 (Toll Free: 1800 11 9792)" },
                                { icon: Mail, title: "Email Address", detail: "monitoring-fc@nic.in" },
                                { icon: Clock, title: "Office Hours", detail: "Monday - Friday: 9:00 AM - 5:30 PM" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-2xl border bg-muted/10 hover:bg-muted/30 transition-all">
                                    <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card p-8 md:p-12 rounded-[40px] border shadow-2xl space-y-8">
                        <h2 className="text-2xl font-bold text-primary">Send a Message</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
                                    <input className="w-full bg-muted/50 border rounded-xl h-12 px-4 focus:ring-2 ring-primary outline-none" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Email</label>
                                    <input className="w-full bg-muted/50 border rounded-xl h-12 px-4 focus:ring-2 ring-primary outline-none" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Subject</label>
                                <input className="w-full bg-muted/50 border rounded-xl h-12 px-4 focus:ring-2 ring-primary outline-none" placeholder="How can we help?" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Message</label>
                                <textarea className="w-full bg-muted/50 border rounded-xl p-4 min-h-[150px] focus:ring-2 ring-primary outline-none" placeholder="Type your message here..." />
                            </div>
                            <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-14 rounded-2xl shadow-xl shadow-accent/20 transition-all">
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
