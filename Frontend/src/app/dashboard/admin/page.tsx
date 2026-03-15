'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import { RoleGuard } from '@/components/role-guard';
import {
    Users,
    FileCheck,
    Clock,
    AlertTriangle,
    ArrowUpRight,
    MoreVertical,
    Activity,
    Settings,
    Loader2,
    ClipboardList
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';

const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Approved Role Change', target: 'Scrutiny Team', time: '2 mins ago' },
    { id: 2, user: 'Admin System', action: 'Backup Completed', target: 'Database', time: '1 hour ago' },
    { id: 3, user: 'Sara Smith', action: 'Configured Sector', target: 'Mining', time: '3 hours ago' },
];

export default function AdminOverview() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProposals: 0,
        clearedProjects: 0,
        pendingAlerts: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchGlobalStats = async () => {
            try {
                if (!token) return;

                // Fetch Users
                const usersRes = await fetch('/api/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const users = await usersRes.json();

                // Fetch All Proposals (as admin)
                const propsRes = await fetch('/api/proposals', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const proposals = await propsRes.json();

                setStats({
                    totalUsers: users.length,
                    totalProposals: proposals.length,
                    clearedProjects: proposals.filter((p: any) => p.status === 'approved').length,
                    pendingAlerts: proposals.filter((p: any) => p.status === 'eds_sought').length
                });

            } catch (error) {
                console.error(error);
                toast.error("Failed to load global analytics");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGlobalStats();
    }, [token]);

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Gathering global analytics...</p>
            </div>
        );
    }
    return (
        <RoleGuard allowedRoles={['admin']}>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">System Administrator Console</h1>
                    <p className="text-muted-foreground mt-1">Global oversight and configuration for PARIVESH 3.0</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Registered Users"
                        value={stats.totalUsers.toLocaleString()}
                        icon={Users}
                        trend={{ value: 5, isUp: true }}
                    />
                    <StatCard
                        title="Managed Proposals"
                        value={stats.totalProposals.toLocaleString()}
                        icon={ClipboardList}
                        trend={{ value: 12, isUp: true }}
                    />
                    <StatCard
                        title="Cleared Projects"
                        value={stats.clearedProjects.toLocaleString()}
                        icon={FileCheck}
                    />
                    <StatCard
                        title="Pending Alerts"
                        value={stats.pendingAlerts.toString()}
                        icon={AlertTriangle}
                        className={stats.pendingAlerts > 0 ? "text-red-600 bg-red-50" : ""}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Table Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>User Role Status</CardTitle>
                                    <CardDescription>Overview of registered departments</CardDescription>
                                </div>
                                <Button variant="outline" size="sm">View All Users</Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Active Leads</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { dept: 'Scrutiny Cell', status: 'Operational', leads: 42 },
                                            { dept: 'MoM Committee', status: 'In Session', leads: 12 },
                                            { dept: 'Technical Cell', status: 'Operational', leads: 28 },
                                            { dept: 'Support Desk', status: 'Overloaded', leads: 15 },
                                        ].map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-semibold text-primary">{row.dept}</TableCell>
                                                <TableCell>
                                                    <Badge variant={row.status === 'Operational' ? 'outline' : 'secondary'} className={row.status === 'Operational' ? 'text-green-600 border-green-200 bg-green-50' : ''}>
                                                        {row.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{row.leads}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Activity */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">System Logs</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex gap-4">
                                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                <span className="text-primary font-bold">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{activity.target} • {activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="link" className="w-full text-xs text-accent">View Detailed Logs</Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary text-white border-none shadow-lg">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Settings className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-bold">Sector Configuration</h3>
                                </div>
                                <p className="text-xs text-white/80">
                                    Manage the parameters and threshold values for different industrial sectors (Mining, Infra, etc.).
                                </p>
                                <Button className="w-full bg-accent hover:bg-accent/90 border-none">Configure Parameters</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </RoleGuard>
    );
}
