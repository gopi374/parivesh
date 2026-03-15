'use client';

import { DUMMY_STATS } from '@/lib/constants';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle2, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Total Applications', value: DUMMY_STATS.totalApplications, icon: FileText, color: 'text-blue-600' },
    { label: 'Approved Projects', value: DUMMY_STATS.approvedProjects, icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Pending Reviews', value: DUMMY_STATS.pendingReviews, icon: Clock, color: 'text-orange-600' },
    { label: 'Meetings Conducted', value: DUMMY_STATS.meetingsConducted, icon: Users, color: 'text-purple-600' },
];

export default function Statistics() {
    return (
        <section className="py-24 bg-gradient-to-b from-secondary/30 to-background border-y">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border shadow-xl bg-white/60 backdrop-blur-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
                                <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
                                    <div className={`p-5 rounded-3xl bg-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                        <stat.icon className={`h-10 w-10 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black text-primary tracking-tighter">{stat.value.toLocaleString()}+</h3>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mt-2">
                                            {stat.label}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
