
'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import WorkflowStatus, { WORKFLOW_STAGES } from '@/components/workflow/WorkflowStatus';
import { Badge } from '@/components/ui/badge';

interface Application {
    uid: string;
    name: string;
    project_title: string;
    proponent: string;
    sector: string;
    category: string;
    location: string;
    description: string;
    environmental_impact?: string;
    mitigation_measures?: string;
    status: string;
    stage: string;
    submittedAt: string;
}

export default function TrackApplication() {
    const [appId, setAppId] = useState('EC-2026-001');
    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentLevel, setCurrentLevel] = useState(0);

    const fetchApplication = async (uid: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/environmental?uid=${uid}`);
            if (!response.ok) {
                throw new Error('Application not found');
            }
            const data = await response.json();
            setApplication(data);
            // Store the level number
            const levelIndex = WORKFLOW_STAGES.findIndex(s => s.id === data.stage);
            setCurrentLevel(levelIndex >= 0 ? levelIndex : 0);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setApplication(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout role="proponent">
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
                            placeholder="Enter App ID... (e.g. EC-2026-001)"
                            className="h-12 w-full md:w-64"
                        />
                        <Button className="h-12 px-6 bg-primary" onClick={() => fetchApplication(appId)} disabled={loading}>
                            <Search className="h-4 w-4 mr-2" /> {loading ? 'Tracking...' : 'Track'}
                        </Button>
                    </div>
                </div>

                {application && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Status Visualizer */}
                        <Card className="border-none shadow-xl bg-card overflow-hidden">
                            <CardHeader className="bg-primary/5 border-b py-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary rounded-2xl text-white">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Current Status: {application.stage.charAt(0).toUpperCase() + application.stage.slice(1).replace('_', ' ')}</CardTitle>
                                            <CardDescription>Last updated: {new Date(application.submittedAt).toLocaleDateString()} • Expected decision by April 15, 2026</CardDescription>
                                        </div>
                                    </div>
                                    <Badge className="h-8 px-4 text-xs font-bold bg-blue-600">IN PROGRESS</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 md:p-12">
                                <WorkflowStatus currentStage={application.stage} />
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Project Summary */}
                            <Card className="lg:col-span-2 border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Project Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Project Title</span>
                                            <p className="text-base font-semibold text-primary">{application.project_title}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Industry Sector</span>
                                            <p className="text-base font-semibold text-primary">{application.sector.charAt(0).toUpperCase() + application.sector.slice(1)}</p>
                                        </div>
                                        <div className="space-y-1 flex items-start gap-4">
                                            <MapPin className="h-5 w-5 text-accent shrink-0" />
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Location</span>
                                                <p className="text-sm font-medium">{application.location}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 flex items-start gap-4">
                                            <Calendar className="h-5 w-5 text-accent shrink-0" />
                                            <div>
                                                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Submission Date</span>
                                                <p className="text-sm font-medium">{new Date(application.submittedAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Timeline / History */}
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-lg">Recent History</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {[
                                        { title: 'Re-assigned to Scrutiny Team', time: 'Mar 12, 11:30 AM', color: 'bg-blue-500' },
                                        { title: 'EDS Response Received', time: 'Mar 10, 04:15 PM', color: 'bg-green-500' },
                                        { title: 'Essential Document Sought', time: 'Mar 05, 09:00 AM', color: 'bg-red-500' },
                                        { title: 'Application Submitted', time: 'Mar 01, 10:00 AM', color: 'bg-primary' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 relative">
                                            {i !== 3 && <div className="absolute top-2 left-1.5 w-0.5 h-full bg-muted z-0" />}
                                            <div className={`h-3 w-3 rounded-full ${item.color} mt-1.5 shrink-0 z-10`} />
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold leading-none">{item.title}</p>
                                                <p className="text-[10px] text-muted-foreground">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="link" className="w-full text-xs text-accent">View Detailed Audit Trail</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {!application && !loading && (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="bg-muted p-6 rounded-full">
                            <Search className="h-10 w-10 text-muted-foreground opacity-30" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold">{error || 'No results to show'}</h3>
                            <p className="text-muted-foreground max-w-xs mx-auto text-sm">Enter a valid application ID to track its real-time progress through the clearance cycle.</p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
