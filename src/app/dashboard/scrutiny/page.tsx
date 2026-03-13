'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import {
    FileSearch,
    Clock,
    Send,
    AlertCircle,
    MoreHorizontal,
    FileCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function ScrutinyOverview() {
    const tasks = [
        { id: 'EC-2026-001', title: 'Solar Plant - Site A', proponent: 'Green Energy', deadline: '2 days left', priority: 'High' },
        { id: 'EC-2026-002', title: 'Cement Factory', proponent: 'Ultra Build', deadline: '5 days left', priority: 'Medium' },
        { id: 'EC-2026-015', title: 'IT Park Ph-2', proponent: 'Tech City', deadline: 'Overdue', priority: 'Immediate' },
    ];

    return (
        <DashboardLayout role="scrutiny">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Scrutiny Officer Console</h1>
                    <p className="text-muted-foreground mt-1">Verify applications, flag deficiencies, and refer to meetings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="My Active Tasks" value="18" icon={FileSearch} />
                    <StatCard title="Pending Review" value="6" icon={Clock} />
                    <StatCard title="EDS Responses" value="4" icon={Send} className="bg-blue-50" />
                    <StatCard title="Overdue" value="2" icon={AlertCircle} className="bg-red-50" />
                </div>

                <Card className="border-none shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Assigned Applications</CardTitle>
                            <CardDescription>Applications waiting for technical scrutiny</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Filter</Button>
                            <Button size="sm">Search</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>App ID</TableHead>
                                    <TableHead>Project Title</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-mono font-bold text-primary">{task.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{task.title}</span>
                                                <span className="text-[10px] text-muted-foreground">{task.proponent}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={task.deadline === 'Overdue' ? 'text-red-500 font-bold' : ''}>{task.deadline}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                task.priority === 'High' ? 'border-orange-200 text-orange-600 bg-orange-50' :
                                                    task.priority === 'Immediate' ? 'border-red-200 text-red-600 bg-red-50' : ''
                                            }>
                                                {task.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="flex items-center justify-center h-8 w-8 hover:bg-accent rounded-md">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="gap-2"><FileSearch className="h-4 w-4" /> Start Review</DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2"><FileCheck className="h-4 w-4" /> Verify Docs</DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 text-red-600">Flag Deficiency</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
