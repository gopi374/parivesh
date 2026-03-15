import { FileDown, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DownloadsPage({
    category = "General",
    docs = [
        { name: "Environmental Impact Assessment Notification 2006", size: "2.4 MB", date: "14 Sep 2006" },
        { name: "Forest (Conservation) Amendment Act 2023", size: "1.1 MB", date: "04 Aug 2023" },
        { name: "Handbook of Guidelines for FC", size: "5.7 MB", date: "28 Mar 2023" }
    ]
}) {
    return (
        <main className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
                                {category} <span className="text-accent underline decoration-primary/20 underline-offset-8">Repository</span>
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium">Download latest legislation, user manuals, and technical guidance.</p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input className="w-full bg-muted/50 border rounded-xl h-12 pl-10 pr-4 outline-none focus:ring-2 ring-primary" placeholder="Search documents..." />
                            </div>
                            <Button variant="outline" className="h-12 rounded-xl gap-2 text-primary font-bold">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                    </div>

                    <div className="bg-card border rounded-[40px] overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50 border-b">
                                    <tr>
                                        <th className="px-8 py-6 text-xs font-black uppercase text-primary tracking-widest">Document Name</th>
                                        <th className="px-8 py-6 text-xs font-black uppercase text-primary tracking-widest text-center">Version/Date</th>
                                        <th className="px-8 py-6 text-xs font-black uppercase text-primary tracking-widest text-center">Size</th>
                                        <th className="px-8 py-6 text-xs font-black uppercase text-primary tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {docs.map((doc, i) => (
                                        <tr key={i} className="hover:bg-muted/30 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-primary group-hover:text-accent transition-colors">{doc.name}</div>
                                                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight mt-1">PDF Document</div>
                                            </td>
                                            <td className="px-8 py-6 text-center text-sm font-medium text-muted-foreground">
                                                {doc.date}
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="px-3 py-1 bg-muted rounded-full text-[10px] font-black">{doc.size}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="inline-flex items-center gap-2 text-primary hover:text-accent font-black text-xs uppercase tracking-widest transition-all hover:scale-105">
                                                    Download
                                                    <FileDown className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export function Rules() { return <DownloadsPage category="Acts & Rules" /> }
export function Manuals() { return <DownloadsPage category="User Manuals" /> }
export function Technical() { return <DownloadsPage category="Technical" /> }
