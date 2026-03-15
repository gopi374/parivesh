import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Settings2 } from "lucide-react";

export default function TemplatesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Template Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage system-wide document and form templates.</p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    New Template
                </Button>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-6">
                <div className="space-y-4">
                    {[
                        'Environmental Clearance Form A', 
                        'Forest Clearance Checklist', 
                        'Wildlife Assessment Template',
                        'Standard Deficiency Letter'
                    ].map((template) => (
                        <div key={template} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-500/10 p-2 rounded">
                                    <FileText className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium">{template}</h4>
                                    <p className="text-sm text-muted-foreground">Last updated: 2 days ago</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Settings2 className="h-4 w-4" /> Configure
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
