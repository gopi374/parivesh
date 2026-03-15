'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import {
    FileSearch,
    Clock,
    Send,
    AlertCircle,
    MoreHorizontal,
    FileCheck,
    Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { RoleGuard } from '@/components/role-guard';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function ScrutinyOverview() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            if (!token) return;

            const response = await fetch('http://localhost:5000/api/scrutiny/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load scrutiny tasks");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    const handleReferMoM = async (proposerId: string) => {
        try {
            if (!token) return;

            const response = await fetch(`http://localhost:5000/api/scrutiny/refer-mom/${proposerId}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    committee: 'Infrastructure EAC',
                    meetingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    priority: 'High'
                })
            });

            if (!response.ok) throw new Error('Failed to refer project');
            
            toast.success("Project referred to MoM successfully!");
            fetchTasks(); // Refresh
        } catch (error) {
            toast.error("Error referring project to MoM");
        }
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading assigned tasks...</p>
            </div>
        );
    }

    return (
        <RoleGuard allowedRoles={['scrutiny', 'admin']}>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Scrutiny Officer Console</h1>
                    <p className="text-muted-foreground mt-1">Verify applications, flag deficiencies, and refer to meetings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="My Active Tasks" value={tasks.length.toString()} icon={FileSearch} />
                    <StatCard title="Pending Review" value={tasks.filter(t => t.status === 'submitted').length.toString()} icon={Clock} />
                    <StatCard title="EDS Responses" value={tasks.filter(t => t.status === 'eds_sought').length.toString()} icon={Send} className="bg-blue-50" />
                    <StatCard title="Overdue" value="0" icon={AlertCircle} className="bg-red-50" />
                </div>

                <Card className="border-none shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Assigned Applications</CardTitle>
                            <CardDescription>Applications waiting for technical scrutiny</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>App ID</TableHead>
                                    <TableHead>Project Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-mono font-bold text-primary">{task.id?.slice(-8)}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{task.title}</span>
                                                <span className="text-[10px] text-muted-foreground">{task.proponentEmail}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">CAT {task.category?.toUpperCase()}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="capitalize">{task.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="flex items-center justify-center h-8 w-8 hover:bg-accent rounded-md">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="gap-2"><FileSearch className="h-4 w-4" /> Start Review</DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2"><FileCheck className="h-4 w-4" /> Verify Docs</DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        className="gap-2 text-accent font-semibold"
                                                        onClick={() => handleReferMoM(task.id)}
                                                    >
                                                        <Send className="h-4 w-4" /> Refer to MoM
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 text-red-600">Flag Deficiency</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {tasks.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            No assigned tasks found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </RoleGuard>
    );
}
