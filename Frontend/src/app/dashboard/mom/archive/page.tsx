import { Button } from "@/components/ui/button";
import { Search, Archive, Calendar as CalendarIcon, Filter, Download } from "lucide-react";

export default function MomArchivePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">MoM Archive</h1>
                    <p className="text-muted-foreground mt-1">Search and retrieve finalized Minutes of Meetings.</p>
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by keyword, meeting number, or committee..."
                            className="w-full pl-9 pr-4 py-2 bg-background rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <select className="px-3 py-2 bg-background border rounded-lg text-sm text-muted-foreground focus:outline-none focus:ring-2">
                        <option>All Committees</option>
                        <option>EAC Industry 1</option>
                        <option>EAC Industry 2</option>
                        <option>EAC Mining</option>
                    </select>
                    <select className="px-3 py-2 bg-background border rounded-lg text-sm text-muted-foreground focus:outline-none focus:ring-2">
                        <option>All Years</option>
                        <option>2026</option>
                        <option>2025</option>
                        <option>2024</option>
                    </select>
                    <Button variant="secondary" className="gap-2">
                        <Filter className="h-4 w-4" /> Apply Filters
                    </Button>
                </div>

                <div className="rounded-md border">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-muted-foreground">
                                <th className="h-12 px-4 text-left font-medium">Meeting Title</th>
                                <th className="h-12 px-4 text-left font-medium">Committee</th>
                                <th className="h-12 px-4 text-left font-medium">Date Held</th>
                                <th className="h-12 px-4 text-left font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                    <td className="p-4 font-medium flex items-center gap-2">
                                        <Archive className="h-4 w-4 text-muted-foreground" />
                                        Minutes of {100 + i}th Meeting
                                    </td>
                                    <td className="p-4">EAC {i % 2 === 0 ? 'Mining' : 'Industry'}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <CalendarIcon className="h-3 w-3" />
                                            {10 + i} Jan 2026
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="gap-2">
                                                <Download className="h-4 w-4" /> PDF
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div>Showing 1-5 of 124 results</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
