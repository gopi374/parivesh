'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Calendar, Clock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import WorkflowStatus from '@/components/workflow/WorkflowStatus';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';

interface AuditLog {
    status: string;
    timestamp: string;
    message: string;
}

interface Proposal {
    id: string;
    title: string;
    category: string;
    status: string;
    sector: string;
    createdAt: string;
    details: {
        location: string;
    };
    history: AuditLog[];
}

function TrackContent() {
    const searchParams = useSearchParams();
    const [appId, setAppId] = useState(searchParams.get('id') || '');
    const [proposal, setProposal] = useState<Proposal | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const handleTrack = async (id: string = appId) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            if (!token) {
                toast.error("Please log in to track applications");
                setIsLoading(false);
                return;
            }

            const response = await fetch(`/api/proposals/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                if (response.status === 404) throw new Error('Application not found');
                throw new Error('Failed to fetch details');
            }

            const data = await response.json();
            setProposal(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const initialId = searchParams.get('id');
        if (initialId) {
            handleTrack(initialId);
        }
    }, [searchParams, token]);

    const getStatusTheme = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'approved') return { badge: 'bg-green-600', text: 'APPROVED' };
        if (s === 'rejected') return { badge: 'bg-red-600', text: 'REJECTED' };
        if (s === 'submitted') return { badge: 'bg-blue-600', text: 'SUBMITTED' };
        return { badge: 'bg-amber-600', text: status.toUpperCase() };
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Application Tracker</h1>
                    <p className="text-muted-foreground mt-1">Real-time status of your environmental clearance filings.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Input
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="Enter Proposal ID..."
                        className="h-12 w-full md:w-64"
                    />
                    <Button 
                        className="h-12 px-6 bg-primary" 
                        onClick={() => handleTrack()}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                        Track
                    </Button>
                </div>
            </div>

            {proposal && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-none shadow-xl bg-card overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b py-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-primary rounded-2xl text-white">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Current Status: {proposal.status}</CardTitle>
                                        <CardDescription>
                                            Updated: {new Date(proposal.history[proposal.history.length - 1]?.timestamp || proposal.createdAt).toLocaleString()}
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge className={`h-8 px-4 text-xs font-bold ${getStatusTheme(proposal.status).badge}`}>
                                    {getStatusTheme(proposal.status).text}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 md:p-12">
                            <WorkflowStatus currentStage={proposal.status.toLowerCase()} />
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 border-none shadow-md">
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Project Title</span>
                                        <p className="text-base font-semibold text-primary">{proposal.title}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Industry Sector</span>
                                        <p className="text-base font-semibold text-primary">{proposal.sector || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-1 flex items-start gap-4">
                                        <MapPin className="h-5 w-5 text-accent shrink-0" />
                                        <div>
                                            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Location</span>
                                            <p className="text-sm font-medium">{proposal.details?.location || 'Not Specified'}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 flex items-start gap-4">
                                        <Calendar className="h-5 w-5 text-accent shrink-0" />
                                        <div>
                                            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Submission Date</span>
                                            <p className="text-sm font-medium">{new Date(proposal.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Application History</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {[...(proposal.history || [])].reverse().map((item, i, arr) => (
                                    <div key={i} className="flex gap-4 relative">
                                        {i !== arr.length - 1 && <div className="absolute top-2 left-1.5 w-0.5 h-full bg-muted z-0" />}
                                        <div className={`h-3 w-3 rounded-full bg-primary mt-1.5 shrink-0 z-10`} />
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold leading-none capitalize">{item.status}</p>
                                            <p className="text-[10px] text-muted-foreground italic mb-1">{item.message}</p>
                                            <p className="text-[10px] text-muted-foreground font-mono">{new Date(item.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {!proposal && !isLoading && !error && (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-muted p-6 rounded-full">
                        <Search className="h-10 w-10 text-muted-foreground opacity-30" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold">Search for an application</h3>
                        <p className="text-muted-foreground max-w-xs mx-auto text-sm">Enter your Proposal ID to track its real-time progress.</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-red-50 p-6 rounded-full">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold italic text-red-700">Application not found</h3>
                        <p className="text-muted-foreground max-w-xs mx-auto text-sm">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function TrackApplication() {
    return (
        <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>}>
            <TrackContent />
        </Suspense>
    );
}
