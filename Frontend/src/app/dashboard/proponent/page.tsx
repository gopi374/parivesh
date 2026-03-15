'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import {
    FilePlus,
    ClipboardList,
    Clock,
    CheckCircle2,
    ArrowRight,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { RoleGuard } from '@/components/role-guard';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';

export default function ProponentOverview() {
    const [stats, setStats] = useState({
        total: 0,
        underScrutiny: 0,
        approvals: 0,
        eds: 0
    });
    const [recentApps, setRecentApps] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!token) return;

                const response = await fetch('http://localhost:5000/api/proposals', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error('Failed to fetch dashboard data');

                const data = await response.json();
                setRecentApps(data.slice(0, 3));
                
                // Calculate stats locally for now
                setStats({
                    total: data.length,
                    underScrutiny: data.filter((a: any) => a.status === 'submitted' || a.status === 'under_scrutiny').length,
                    approvals: data.filter((a: any) => a.status === 'approved').length,
                    eds: data.filter((a: any) => a.status === 'eds_sought').length
                });

            } catch (error) {
                console.error(error);
                toast.error("Failed to load dashboard data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Initializing Dashboard...</p>
            </div>
        );
    }

    return (
        <RoleGuard allowedRoles={['proponent', 'admin']}>
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
                    <StatCard title="Total Applications" value={stats.total.toString()} icon={ClipboardList} />
                    <StatCard title="Under Scrutiny" value={stats.underScrutiny.toString()} icon={Clock} />
                    <StatCard title="Approvals" value={stats.approvals.toString()} icon={CheckCircle2} />
                    <StatCard title="EDS Pending" value={stats.eds.toString()} icon={AlertCircle} className="bg-red-50" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-primary">Recent Applications</h2>
                            <Link href="/dashboard/proponent/applications">
                                <Button variant="link" className="text-accent underline-offset-4">View All</Button>
                            </Link>
                        </div>

                        <div className="grid gap-4">
                            {recentApps.map((app) => (
                                <Card key={app.id} className="border-none shadow-sm hover:shadow-md transition-shadow group">
                                    <CardContent className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/5 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <ClipboardList className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{app.title}</h3>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="bg-secondary px-2 py-0.5 rounded font-mono uppercase tracking-tighter">{app.id?.slice(-8)}</span>
                                                    <span>•</span>
                                                    <span>Last updated {new Date(app.updatedAt || app.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <Badge variant={app.status === 'Draft' ? 'secondary' : 'outline'} className={
                                                app.status === 'submitted' ? 'text-blue-600 border-blue-200' :
                                                    app.status === 'eds_sought' ? 'text-red-600 border-red-200' : ''
                                            }>
                                                {app.status}
                                            </Badge>
                                            <Link href={`/dashboard/proponent/track?id=${app.id}`}>
                                                <Button variant="ghost" size="icon"><ArrowRight className="h-5 w-5 text-primary" /></Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {recentApps.length === 0 && (
                                <div className="p-12 text-center border-2 border-dashed rounded-2xl border-muted">
                                    <p className="text-muted-foreground">No recent applications found.</p>
                                </div>
                            )}
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
        </RoleGuard>
    );
}
