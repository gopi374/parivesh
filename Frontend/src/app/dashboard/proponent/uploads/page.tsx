import { Button } from "@/components/ui/button";
import { UploadCloud, File, AlertCircle, CheckCircle2 } from "lucide-react";

export default function UploadsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Upload Documents</h1>
                    <p className="text-muted-foreground mt-1">Upload required additional files and EDS responses.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card rounded-xl border shadow-sm p-6 text-center border-dashed">
                        <div className="flex flex-col items-center justify-center py-10">
                            <div className="bg-primary/10 p-4 rounded-full mb-4">
                                <UploadCloud className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Drag & Drop files here</h3>
                            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                                Support for PDF, DOCX, KMZ, and ZIP files up to 50MB. Click to browse files.
                            </p>
                            <Button>Browse Files</Button>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-background border p-2 rounded text-blue-600">
                                            <File className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium">EIA_Report_Final_v{i}.pdf</h4>
                                            <p className="text-xs text-muted-foreground">Uploaded 2 hours ago • 12MB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <span className="text-xs font-medium text-green-600">Processed</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-900 shadow-sm p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-orange-900 dark:text-orange-300">Pending EDS</h3>
                                <p className="text-sm text-orange-800/80 dark:text-orange-400/80 mt-1">You have 1 pending Essential Detail Sought (EDS) request.</p>
                            </div>
                        </div>
                        <div className="bg-background rounded-lg border p-4 text-sm mt-4">
                            <p className="font-medium mb-2">For Proposal: SIA/KA/INF/12456/2026</p>
                            <p className="text-muted-foreground mb-4">Please upload the revised land allocation map reflecting changes suggested by SEAC.</p>
                            <Button size="sm" className="w-full">Upload Response Docs</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
