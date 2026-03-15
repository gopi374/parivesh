'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, CheckCircle2, Clock, MapPin, Loader2, AlertCircle } from "lucide-react";
import Link from 'next/link';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

interface Proposal {
    id: string;
    title: string;
    category: string;
    status: string;
    createdAt: string;
    details: {
        location: string;
    };
}

export default function ApplicationsPage() {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                if (!token) {
                    setError("Not authenticated");
                    setIsLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:5000/api/proposals', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error('Failed to fetch applications');

                const data = await response.json();
                setProposals(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
                toast.error("Error loading applications");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProposals();
    }, [token]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading your applications...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-center">
                <div className="bg-red-50 p-4 rounded-full">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold italic">Something went wrong</h2>
                <p className="text-muted-foreground max-w-sm">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
                    <p className="text-muted-foreground mt-1">View and manage your submitted clearance applications.</p>
                </div>
                <Link href="/dashboard/proponent/new">
                    <Button className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Apply For Clearance
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {proposals.map((proposal) => (
                    <div key={proposal.id} className="bg-card rounded-xl border shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-4">
                            <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize", getStatusColor(proposal.status))}>
                                {proposal.status}
                            </span>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold line-clamp-1 pr-16" title={proposal.title}>
                                    {proposal.title}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" /> {proposal.details?.location || 'Location not specified'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 mt-6 border-t pt-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Proposal ID</span>
                                <span className="font-mono font-medium truncate max-w-[150px]">{proposal.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Category</span>
                                <span className="font-medium">Category {proposal.category.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Submitted On</span>
                                <span className="font-medium flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {new Date(proposal.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <Button variant="outline" className="flex-1 gap-2">
                                <FileText className="h-4 w-4" /> Details
                            </Button>
                            <Link href={`/dashboard/proponent/track?id=${proposal.id}`} className="flex-1">
                                <Button className="w-full gap-2">
                                    <Clock className="h-4 w-4" /> Track
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}

                <Link href="/dashboard/proponent/new" className="block h-full">
                    <div className="bg-muted/30 rounded-xl border border-dashed flex flex-col items-center justify-center p-6 text-center shadow-sm h-full min-h-[250px] hover:bg-muted/50 transition-colors">
                        <div className="bg-background p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <PlusCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium text-lg mb-1">New Application</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-[200px]">
                            Start a new clearance process.
                        </p>
                    </div>
                </Link>
            </div>
            {proposals.length === 0 && !isLoading && !error && (
                <div className="py-20 text-center">
                    <p className="text-muted-foreground">You haven't submitted any applications yet.</p>
                </div>
            )}
        </div>
    );
}
