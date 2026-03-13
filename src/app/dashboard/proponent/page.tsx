'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import {
    FilePlus,
    ClipboardList,
    Clock,
    CheckCircle2,
    ArrowRight,
    AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ProponentOverview() {
    const myApplications = [
        { id: 'EC-2026-001', title: 'Solar Plant - Phase 1', status: 'Under Scrutiny', date: 'Mar 10, 2026' },
        { id: 'EC-2026-005', title: 'Textile Unit Expansion', status: 'EDS Sought', date: 'Mar 05, 2026' },
        { id: 'EC-2026-009', title: 'Logistics Hub', status: 'Draft', date: 'Today' },
    ];

    return (
        <DashboardLayout role="proponent">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Project Proponent Console</h1>
                        <p className="text-muted-foreground mt-1">Manage your environmental clearances and ongoing applications.</p>
                    </div>
                    <Link href="/dashboard/proponent/new">
                        <Button className="bg-accent hover:bg-accent/90 text-white h-12 px-6 gap-2 shadow-lg shadow-accent/20">
                            <FilePlus className="h-5 w-5" />
                            New Application
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Applications" value="12" icon={ClipboardList} />
                    <StatCard title="Under Scrutiny" value="4" icon={Clock} />
                    <StatCard title="Approvals" value="6" icon={CheckCircle2} />
                    <StatCard title="EDS Pending" value="2" icon={AlertCircle} className="bg-red-50" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-primary">Recent Applications</h2>
                            <Button variant="link" className="text-accent underline-offset-4">View All</Button>
                        </div>

                        <div className="grid gap-4">
                            {myApplications.map((app) => (
                                <Card key={app.id} className="border-none shadow-sm hover:shadow-md transition-shadow group">
                                    <CardContent className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/5 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <ClipboardList className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{app.title}</h3>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="bg-secondary px-2 py-0.5 rounded font-mono uppercase tracking-tighter">{app.id}</span>
                                                    <span>•</span>
                                                    <span>Last updated {app.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <Badge variant={app.status === 'Draft' ? 'secondary' : 'outline'} className={
                                                app.status === 'Under Scrutiny' ? 'text-blue-600 border-blue-200' :
                                                    app.status === 'EDS Sought' ? 'text-red-600 border-red-200' : ''
                                            }>
                                                {app.status}
                                            </Badge>
                                            <Button variant="ghost" size="icon"><ArrowRight className="h-5 w-5 text-primary" /></Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-none shadow-md bg-card">
                            <CardHeader>
                                <CardTitle className="text-lg">Alerts & Actions</CardTitle>
                                <CardDescription>Items requiring your urgent attention</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 rounded-xl border-l-4 border-red-500 bg-red-50 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-red-600 uppercase">EDS Sought</span>
                                        <span className="text-[10px] text-red-400">2h ago</span>
                                    </div>
                                    <p className="text-sm font-medium">Additional documents required for 'Textile Unit Expansion'.</p>
                                    <Button size="sm" variant="outline" className="text-[10px] h-7 border-red-200 text-red-600 hover:bg-red-100">Upload Now</Button>
                                </div>
                                <div className="p-4 rounded-xl border-l-4 border-orange-500 bg-orange-50 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-orange-600 uppercase">Payment Pending</span>
                                        <span className="text-[10px] text-orange-400">1d ago</span>
                                    </div>
                                    <p className="text-sm font-medium">Application fee pending for 'Logistics Hub'.</p>
                                    <Button size="sm" variant="outline" className="text-[10px] h-7 border-orange-200 text-orange-600 hover:bg-orange-100">Pay 10,000 INR</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-gradient-to-br from-primary to-blue-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <h3 className="text-xl font-bold mb-2">Need Guidance?</h3>
                            <p className="text-sm text-white/70 mb-6 leading-relaxed">Download the step-by-step user manual for new clearance applications.</p>
                            <Button className="w-full bg-accent hover:bg-accent/90 border-none font-bold">Download Manual (PDF)</Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
