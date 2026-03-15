'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    List, ListOrdered, Save, FileCheck, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight, Eye, FileText,
    Bot, Sparkles, User, Send, Loader2, RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function MoMEditor() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');
    const [projectData, setProjectData] = useState<any>(null);
    const { token } = useAuth();

    const [content, setContent] = useState(`
    <h1 style="text-align: center;">MINUTES OF THE MEETING</h1>
    <p style="text-align: center;">Government of India | MoEF&CC</p>
    <hr/>
    <p>Loading project context...</p>
  `);
    const [isFinalized, setIsFinalized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContext = async () => {
            if (!projectId) {
                setIsLoading(false);
                return;
            }

            try {
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/proposals/${projectId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error('Failed to fetch project context');
                
                const data = await response.json();
                setProjectData(data);
                
                // Initialize content with project context
                setContent(`
                    <h1 style="text-align: center;">MINUTES OF THE EAC MEETING</h1>
                    <p style="text-align: center;"><strong>Project:</strong> ${data.title}</p>
                    <p style="text-align: center;"><strong>ID:</strong> ${data.id}</p>
                    <hr/>
                    <h3>Agenda Item: ${data.category?.toUpperCase()} Clearance</h3>
                    <p><strong>Sector:</strong> ${data.sector || 'N/A'}</p>
                    <p><strong>Description:</strong> ${data.description || 'N/A'}</p>
                    <hr/>
                    <h4>1. Discussion Points</h4>
                    <p>The committee reviewed the proposal details...</p>
                `);
            } catch (error) {
                toast.error("Failed to load project context");
            } finally {
                setIsLoading(false);
            }
        };

        fetchContext();
    }, [projectId, token]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        const text = content.replace(/<[^>]*>/g, '\n').split('\n').filter(line => line.trim() !== '');
        
        doc.setFontSize(16);
        doc.text("PARIVESH 3.0 - MoM Record", 105, 20, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        let y = 40;
        text.forEach((line) => {
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
            doc.text(line, 20, y);
            y += 7;
        });
        
        doc.save(`MoM_Record_${new Date().getTime()}.pdf`);
        toast.success("PDF Downloaded successfully!");
    };

    const finalizeMoM = () => {
        setIsFinalized(true);
        toast.success("MoM has been finalized and locked.");
    };

    // Chatbot State
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hello! I am your AI MoM drafting assistant. Paste your rough meeting notes or transcript here, and I will generate a professional Meeting Gist for you to review and edit.' }
    ]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isGenerating) return;

        const newMessages = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setIsGenerating(true);

        try {
            const response = await fetch('/api/mom/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input, context: content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate');
            }

            const data = await response.json();
            
            setMessages([...newMessages, { role: 'assistant', text: 'I have generated an updated draft based on your input. It has been automatically applied to the editor for your review.' }]);

            // Append the generated HTML to the existing content, or replace it based on logic. 
            // For now, we append it with a separator for new additions.
            setContent(prev => prev + '\n<hr/>\n' + data.result);
            
        } catch (error: any) {
             setMessages([...newMessages, { role: 'assistant', text: `Sorry, I encountered an error: ${error.message}. Please check your API key or try again.` }]);
        } finally {
            setIsGenerating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Pre-loading project context...</p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-8 h-full flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={cn(
                                "text-[10px] uppercase font-bold border-primary text-primary",
                                isFinalized && "border-green-600 text-green-600 bg-green-50"
                            )}>
                                {isFinalized ? 'Finalized & Locked' : 'Drafting Mode'}
                            </Badge>
                            <h1 className="text-3xl font-bold text-primary">Meeting Gist Editor</h1>
                        </div>
                        <p className="text-muted-foreground">
                            {projectData ? `Drafting minutes for: ${projectData.title}` : 'Drafting minutes for EAC Meeting'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {isFinalized ? (
                            <Button size="lg" className="gap-2 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg" onClick={downloadPDF}>
                                <FileText className="h-4 w-4" /> Download PDF Record
                            </Button>
                        ) : (
                            <>
                                <Button variant="outline" size="lg" className="gap-2 h-12">
                                    <Save className="h-4 w-4" /> Save Progress
                                </Button>
                                <Button size="lg" className="gap-2 h-12 bg-green-600 hover:bg-green-700" onClick={finalizeMoM}>
                                    <FileCheck className="h-4 w-4" /> Finalize & Lock MoM
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <Tabs defaultValue="editor" className="flex-1 flex flex-col pr-1">
                    <TabsList className="mb-4 bg-muted/50 p-1 shrink-0 w-max">
                        <TabsTrigger value="editor" className="px-8 py-2 gap-2"><Edit3 className="h-4 w-4" /> Editor Workspace</TabsTrigger>
                        <TabsTrigger value="preview" className="px-8 py-2 gap-2"><Eye className="h-4 w-4" /> Preview View (PDF)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="editor" className="flex-1 m-0 data-[state=inactive]:hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[600px]">
                            {/* Left Column: Rich Text Editor */}
                            <Card className="lg:col-span-2 border-none shadow-xl overflow-hidden flex flex-col h-full">
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
                                <CardContent className="flex-1 p-0 bg-white overflow-hidden flex flex-col">
                                    <ScrollArea className="flex-1 p-12">
                                        <div
                                            className="prose prose-slate max-w-none focus:outline-none min-h-[500px]"
                                            contentEditable
                                            suppressContentEditableWarning
                                            dangerouslySetInnerHTML={{ __html: content }}
                                            onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                        />
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            {/* Right Column: AI Assistant Panel */}
                            <Card className="lg:col-span-1 border-none shadow-xl flex flex-col overflow-hidden bg-primary/5 border-primary/20">
                                <CardHeader className="bg-primary text-primary-foreground py-4 flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <Sparkles className="h-5 w-5 fill-current" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base text-white">AI MoM Assistant</CardTitle>
                                            <CardDescription className="text-primary-foreground/70 text-xs">Auto-draft & refine minutes</CardDescription>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 hover:text-white" onClick={() => setMessages([{ role: 'assistant', text: 'Reseting context... How can I help you draft the next MoM?' }])}>
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <CardContent className="flex-1 p-0 overflow-y-auto flex flex-col bg-card/50" ref={scrollRef as any}>
                                    <div className="p-4 space-y-4">
                                        {messages.map((m, i) => (
                                            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`p-2 shrink-0 rounded-full h-8 w-8 flex items-center justify-center ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground border border-border'}`}>
                                                    {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                                </div>
                                                <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-card border shadow-sm rounded-tl-sm'}`}>
                                                    {m.text}
                                                </div>
                                            </div>
                                        ))}
                                        {isGenerating && (
                                            <div className="flex gap-3">
                                                <div className="p-2 shrink-0 rounded-full h-8 w-8 flex items-center justify-center bg-secondary text-secondary-foreground border border-border">
                                                    <Bot className="h-4 w-4" />
                                                </div>
                                                <div className="px-5 py-4 rounded-2xl bg-card border shadow-sm rounded-tl-sm flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                                    <span className="text-sm text-muted-foreground animate-pulse">Drafting minutes...</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                
                                <CardFooter className="p-4 bg-card border-t shrink-0">
                                    <form 
                                        className="flex items-center w-full gap-2 relative" 
                                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    >
                                        <Input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="E.g. summarize the Siderock mine..."
                                            className="pr-12 h-12 rounded-xl bg-secondary/30 border-secondary focus-visible:ring-primary"
                                            disabled={isGenerating}
                                        />
                                        <Button 
                                            type="submit" 
                                            size="icon" 
                                            className="absolute right-1.5 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 transition-all"
                                            disabled={!input.trim() || isGenerating}
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="preview" className="m-0 data-[state=inactive]:hidden">
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
        </>
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
