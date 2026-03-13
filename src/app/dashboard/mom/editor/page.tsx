'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Save,
    FileCheck,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Eye,
    FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MoMEditor() {
    const [content, setContent] = useState(`
    <h1>MINUTES OF THE 142nd MEETING OF THE EAC (MINING SECTOR)</h1>
    <p><strong>Date:</strong> 15th March 2026</p>
    <p><strong>Chairman:</strong> Dr. V.K. Sharma</p>
    <hr/>
    <h3>Agenda Item 1: Expansion of Siderock Limestone Mine</h3>
    <p>The committee observed that the project proponent has addressed تمامی EDS raised in the previous meeting. The environmental monitoring data for the last three seasons shows compliance with NAAQS.</p>
    <p><strong>Recommendation:</strong> Environmental Clearance is Recommended with specific conditions regarding water harvesting.</p>
  `);

    return (
        <DashboardLayout role="mom">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] uppercase font-bold border-primary text-primary">Drafting Mode</Badge>
                            <h1 className="text-3xl font-bold text-primary">Minute of Meeting Editor</h1>
                        </div>
                        <p className="text-muted-foreground">Drafting minutes for EAC Meeting - Mar 2026</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="lg" className="gap-2 h-12">
                            <Save className="h-4 w-4" /> Save Progress
                        </Button>
                        <Button size="lg" className="gap-2 h-12 bg-green-600 hover:bg-green-700">
                            <FileCheck className="h-4 w-4" /> Finalize & Lock MoM
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="editor" className="w-full">
                    <TabsList className="mb-4 bg-muted/50 p-1">
                        <TabsTrigger value="editor" className="px-8 py-2 gap-2"><Edit3 className="h-4 w-4" /> Editor</TabsTrigger>
                        <TabsTrigger value="preview" className="px-8 py-2 gap-2"><Eye className="h-4 w-4" /> Preview (PDF)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="editor">
                        <Card className="border-none shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                            {/* Toolbar */}
                            <div className="flex flex-wrap items-center gap-1 p-2 bg-secondary/50 border-b border-border">
                                <div className="flex items-center gap-1 bg-background border rounded-md p-1 mx-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Undo className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Redo className="h-4 w-4" /></Button>
                                </div>
                                <div className="h-6 w-px bg-border mx-1" />
                                <div className="flex items-center gap-1 bg-background border rounded-md p-1 mx-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 font-bold">B</Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 italic">I</Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 underline">U</Button>
                                </div>
                                <div className="h-6 w-px bg-border mx-1" />
                                <div className="flex items-center gap-1 bg-background border rounded-md p-1 mx-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><AlignLeft className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><AlignCenter className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><AlignRight className="h-4 w-4" /></Button>
                                </div>
                                <div className="h-6 w-px bg-border mx-1" />
                                <div className="flex items-center gap-1 bg-background border rounded-md p-1 mx-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><List className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><ListOrdered className="h-4 w-4" /></Button>
                                </div>
                            </div>

                            {/* Editor Content */}
                            <CardContent className="flex-1 p-12 bg-white">
                                <div
                                    className="prose prose-slate max-w-none focus:outline-none min-h-[500px]"
                                    contentEditable
                                    suppressContentEditableWarning
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="preview">
                        <Card className="border-none shadow-xl bg-gray-200 min-h-[600px] flex items-center justify-center p-12">
                            <div className="bg-white w-full max-w-4xl h-[1000px] shadow-2xl p-16 space-y-8">
                                <div className="flex flex-col items-center text-center space-y-4 border-b-2 border-black pb-8">
                                    <FileText className="h-12 w-12 text-primary" />
                                    <h2 className="text-2xl font-bold uppercase">Government of India</h2>
                                    <h3 className="text-lg font-bold">Ministry of Environment, Forest and Climate Change</h3>
                                </div>
                                <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}

// Sub-component icon fix
function Edit3({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    );
}
