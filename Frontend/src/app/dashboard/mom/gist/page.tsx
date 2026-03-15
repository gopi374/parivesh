import { Button } from "@/components/ui/button";
import { PlusCircle, Search, FileText, Calendar, Users } from "lucide-react";

export default function MeetingGistPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meeting Gist</h1>
                    <p className="text-muted-foreground mt-1">Manage concise meeting summaries and initial decisions.</p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Create New Gist
                </Button>
            </div>

            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-muted/20">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search meeting gists..."
                            className="w-full pl-9 pr-4 py-2 bg-background rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
                
                <div className="divide-y">
                    {[
                        { title: 'EAC Industry-1 54th Meeting', date: '12 Mar 2026', proposals: 5 },
                        { title: 'SEAC Maharashtra 112th Meeting', date: '10 Mar 2026', proposals: 12 },
                        { title: 'EAC River Valley 32nd Meeting', date: '08 Mar 2026', proposals: 3 },
                    ].map((meeting, i) => (
                        <div key={i} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">
                                        {meeting.title}
                                    </h3>
                                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" /> {meeting.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FileText className="h-4 w-4" /> {meeting.proposals} Proposals Discussed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline">Edit Gist</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
