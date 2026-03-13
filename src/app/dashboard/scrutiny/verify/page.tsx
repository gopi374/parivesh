'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
    FileSearch,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronLeft,
    Download,
    Eye,
    MessageSquare,
    ShieldCheck
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function DocumentVerification() {
    const [selectedDoc, setSelectedDoc] = useState('Pre-Feasibility Report');

    const documents = [
        { name: 'Pre-Feasibility Report', status: 'Pending', type: 'PDF', size: '2.4 MB' },
        { name: 'EIA Report', status: 'Verified', type: 'PDF', size: '12.1 MB' },
        { name: 'EMP Document', status: 'Deficient', type: 'PDF', size: '1.8 MB' },
        { name: 'Land Ownership Docs', status: 'Pending', type: 'PDF', size: '4.5 MB' },
    ];

    return (
        <DashboardLayout role="scrutiny">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-primary">Verification Panel</h1>
                            <Badge variant="outline" className="font-mono">EC-2026-001</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Solar Power Plant - Site A • Green Energy Corp</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
                    {/* Document List Sidebar */}
                    <Card className="lg:col-span-1 border-none shadow-md overflow-hidden flex flex-col">
                        <CardHeader className="bg-secondary/20 py-4">
                            <CardTitle className="text-base">Checklist</CardTitle>
                        </CardHeader>
                        <ScrollArea className="flex-1">
                            <CardContent className="p-0">
                                {documents.map((doc, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedDoc(doc.name)}
                                        className={`p-4 border-b cursor-pointer transition-colors ${selectedDoc === doc.name ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-muted/50'}`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-bold truncate pr-2">{doc.name}</span>
                                            <span className="text-[10px] text-muted-foreground">{doc.size}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className={`text-[9px] px-1 py-0 ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' :
                                                doc.status === 'Deficient' ? 'bg-red-100 text-red-700' : ''
                                                }`}>
                                                {doc.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </ScrollArea>
                    </Card>

                    {/* Preview and Action Area */}
                    <Card className="lg:col-span-3 border-none shadow-lg overflow-hidden flex flex-col">
                        <CardHeader className="border-b py-3 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">{selectedDoc}</CardTitle>
                                <CardDescription className="text-xs">Preview and validate the document content</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Download</Button>
                                <Button size="sm" className="bg-primary gap-2"><Eye className="h-4 w-4" /> New Tab</Button>
                            </div>
                        </CardHeader>

                        <div className="flex-1 flex overflow-hidden">
                            {/* Document Mock Preview */}
                            <div className="flex-1 bg-gray-200 flex items-center justify-center p-8 overflow-auto">
                                <div className="bg-white w-full max-w-3xl h-[800px] shadow-2xl p-12 flex flex-col items-center justify-center text-muted-foreground text-center space-y-4">
                                    <FileSearch className="h-16 w-16 opacity-20" />
                                    <div>
                                        <h3 className="text-xl font-bold italic">Document Preview Mock</h3>
                                        <p className="text-sm">Integrating PDF Viewer for: {selectedDoc}</p>
                                    </div>
                                    <Separator className="w-24" />
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase font-bold tracking-widest">Digital Stamp Info</p>
                                        <p className="text-[10px]">Signed by: Proponent Lead • Mar 12, 2026</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Sidebar */}
                            <div className="w-72 border-l bg-card flex flex-col">
                                <div className="p-4 border-b bg-muted/30">
                                    <h3 className="text-xs font-bold uppercase text-primary">Scrutiny Verdict</h3>
                                </div>
                                <div className="p-4 flex-1 space-y-6">
                                    <div className="space-y-3">
                                        <Button className="w-full bg-green-600 hover:bg-green-700 gap-2 h-11">
                                            <CheckCircle2 className="h-4 w-4" /> Approve Document
                                        </Button>
                                        <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 gap-2 h-11">
                                            <XCircle className="h-4 w-4" /> Mark Deficient
                                        </Button>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <Label className="text-xs font-bold uppercase opacity-50">Notes / Remarks</Label>
                                        <textarea
                                            className="w-full h-32 text-sm p-3 rounded-lg border bg-secondary/20 focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Type your observations here..."
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="p-4 border-t bg-primary/5">
                                    <Button className="w-full gap-2 bg-primary">
                                        <ShieldCheck className="h-4 w-4" /> Confirm Verification
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
