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
        <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-none shadow-sm bg-background">
                                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                    <div className={`p-4 rounded-full bg-background shadow-inner`}>
                                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-primary">{stat.value.toLocaleString()}+</h3>
                                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">
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
