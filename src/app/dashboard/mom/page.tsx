'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import {
    FileText,
    Clock,
    Archive,
    Users,
    MoreVertical,
    Edit3,
    CheckSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function MoMOverview() {
    const referredApps = [
        { id: 'EC-2026-003', committee: 'Infrastructure EAC', date: 'Mar 15, 2026', status: 'Gist Pending' },
        { id: 'EC-2026-009', committee: 'Mining EAC', date: 'Mar 12, 2026', status: 'MoM Ready' },
        { id: 'EC-2026-012', committee: 'Industry FAC', date: 'Mar 10, 2026', status: 'Finalized' },
    ];

    return (
        <DashboardLayout role="mom">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">MoM Committee Portal</h1>
                    <p className="text-muted-foreground mt-1">Generate gists, draft minutes, and archive committee decisions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Referred Projects" value="24" icon={Users} />
                    <StatCard title="Gists to Draft" value="8" icon={Edit3} />
                    <StatCard title="MoMs Pending" value="5" icon={Clock} className="bg-orange-50" />
                    <StatCard title="Finalized MoMs" value="156" icon={Archive} className="bg-green-50" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle>Committee Referrals</CardTitle>
                                <CardDescription>Projects referred for EAC/FAC meetings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>App ID</TableHead>
                                            <TableHead>Committee</TableHead>
                                            <TableHead>Meeting Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {referredApps.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell className="font-mono font-semibold text-primary">{row.id}</TableCell>
                                                <TableCell>{row.committee}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>
                                                    <Badge variant={row.status === 'Finalized' ? 'outline' : 'secondary'} className={
                                                        row.status === 'Gist Pending' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                            row.status === 'MoM Ready' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                                                                row.status === 'Finalized' ? 'bg-green-50 text-green-600 border-green-200' : ''
                                                    }>
                                                        {row.status}
                                                    </Badge>
                                                </TableCell>
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

                    <div className="space-y-6">
                        <Card className="border-none shadow-md bg-secondary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Drafting Assistant</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">Use our AI-assisted tool to convert meeting bullet points into formal Minutes of Meeting (MoM).</p>
                                <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                                    <Edit3 className="h-4 w-4" /> Open MoM Editor
                                </Button>
                                <div className="h-px bg-border my-2" />
                                <div className="flex items-center justify-between text-xs font-medium">
                                    <span>Last Automated Sync</span>
                                    <span className="text-muted-foreground">10:45 AM</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Finalization Goal</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-2xl font-bold text-primary">85%</span>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Monthly Target</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-accent w-[85%]" />
                                </div>
                                <p className="text-[10px] text-muted-foreground">* Target to finalize MoMs within 7 days of meeting.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
