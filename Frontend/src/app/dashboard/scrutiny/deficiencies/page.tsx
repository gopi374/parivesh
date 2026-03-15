import { Button } from "@/components/ui/button";
import { FileWarning, Search, Send, Clock } from "lucide-react";

export default function DeficienciesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Deficiencies (EDS)</h1>
                    <p className="text-muted-foreground mt-1">Manage Essential Details Sought requests and responses.</p>
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-6">
                <div className="flex gap-4 mb-6 border-b pb-4">
                    <button className="text-sm font-medium border-b-2 border-primary text-primary pb-2 px-1">Active EDS</button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2 px-1">Responses Received</button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-2 px-1">Closed</button>
                </div>

                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg flex items-center justify-center shrink-0">
                                <FileWarning className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg">Incomplete EIA Report - Missing Chapter {i + 3}</h3>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
                                        <Clock className="h-3 w-3" />
                                        Pending Prop. Resp.
                                    </span>
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1 mb-4">
                                    <p><span className="font-medium text-foreground">Proposal No:</span> SIA/GJ/IND/44{i}9/2026</p>
                                    <p>The uploaded EIA report is missing the cumulative impact assessment chapter required as per the ToR.</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" size="sm">View Proposal</Button>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Send className="h-4 w-4" /> Send Reminder
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
