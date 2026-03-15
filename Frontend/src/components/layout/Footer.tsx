import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-secondary py-12 border-t">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary p-2 rounded-lg">
                                <Leaf className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <span className="text-2xl font-black text-primary tracking-tighter">PARIVESH 3.0</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                            A single-window hub for Environmental, Forest, Wildlife and CRZ clearances. Promoting Ease of Doing Business with Environmental Sustainability.
                        </p>
                        <div className="flex space-x-4">
                            {[Twitter, Facebook, Linkedin, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="h-10 w-10 rounded-full bg-white border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm">
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-primary uppercase tracking-widest text-xs mb-6 px-1 border-l-4 border-accent">Quick Links</h3>
                        <ul className="space-y-3">
                            {['About Ministry', 'Clearance Process', 'EAC Meeting Records', 'Public Hearing Dates', 'NOC Status'].map((item) => (
                                <li key={item}><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                    <div className="h-1 w-1 rounded-full bg-accent group-hover:w-3 transition-all" />
                                    {item}
                                </Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-primary uppercase tracking-widest text-xs mb-6 px-1 border-l-4 border-accent">Resources</h3>
                        <ul className="space-y-3">
                            {['User Manuals', 'FAQs', 'Contact Helpdesk', 'Feedback', 'Site Map', 'Accessibility Statement'].map((item) => (
                                <li key={item}><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                    <div className="h-1 w-1 rounded-full bg-accent group-hover:w-3 transition-all" />
                                    {item}
                                </Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border shadow-sm">
                        <h3 className="font-bold text-primary flex items-center gap-2 mb-6">
                            <MapPin className="h-5 w-5 text-accent" />
                            Contact Us
                        </h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <span className="text-sm text-muted-foreground font-medium leading-snug">
                                    Ministry of Environment, Forest and Climate Change, Indira Paryavaran Bhawan, Jor Bagh Road, New Delhi - 110003.
                                </span>
                            </li>
                            <li className="flex items-center gap-3 py-3 border-y border-dashed">
                                <Phone className="h-4 w-4 text-primary" />
                                <span className="text-sm font-bold text-primary">+91-11-20819172</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground truncate">monitoring-fc@nic.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium">
                            © 2026 Ministry of Environment, Forest and Climate Change.
                        </p>
                        <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold">
                            Designed & Developed by National Informatics Centre (NIC)
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground font-bold uppercase tracking-tighter">
                        {['Privacy Policy', 'Terms of Service', 'Cyber Security Policy', 'Hyperlinking Policy'].map((item) => (
                            <Link key={item} href="#" className="hover:text-primary transition-colors underline decoration-accent/30 underline-offset-4">{item}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
