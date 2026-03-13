import { AlertCircle, Send, ClipboardList } from 'lucide-react';

export default function ComplaintPage() {
    return (
        <main className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="space-y-4 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest">
                            <AlertCircle className="h-4 w-4" />
                            Technical Support
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter">Submit a Complaint</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Facing issues with the portal? Submit your grievance here. Our technical team will resolve it within 24-48 hours.
                        </p>
                    </div>

                    <div className="bg-card border rounded-[40px] overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="p-8 md:p-12 bg-primary text-white space-y-8">
                                <h2 className="text-2xl font-bold">Important Note</h2>
                                <div className="space-y-6 opacity-80 text-sm">
                                    <div className="flex gap-4">
                                        <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center shrink-0">1</div>
                                        <p>Check "User Manuals" before submitting a technical complaint.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center shrink-0">2</div>
                                        <p>Mention your Proposal ID if the issue relates to a specific application.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center shrink-0">3</div>
                                        <p>Attach screenshots of errors for faster resolution.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 p-8 md:p-12 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Complaint Category</label>
                                        <select className="w-full bg-muted/50 border rounded-xl h-12 px-4 focus:ring-2 ring-primary outline-none">
                                            <option>Technical Issue</option>
                                            <option>Payment Related</option>
                                            <option>Submission Error</option>
                                            <option>Credential Recovery</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-muted-foreground px-1">Proposal ID (Optional)</label>
                                        <input className="w-full bg-muted/50 border rounded-xl h-12 px-4 focus:ring-2 ring-primary outline-none" placeholder="IA/DL/MIN/..." />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground px-1">Detailed Description</label>
                                    <textarea className="w-full bg-muted/50 border rounded-xl p-4 min-h-[150px] focus:ring-2 ring-primary outline-none" placeholder="Describe the error or issue you are facing..." />
                                </div>

                                <div className="p-4 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/30 transition-all cursor-pointer">
                                    <ClipboardList className="h-6 w-6" />
                                    <span className="text-xs font-bold">Upload Screenshot (Max 5MB)</span>
                                </div>

                                <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-accent/20 transition-all group">
                                    <span>File Complaint</span>
                                    <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
