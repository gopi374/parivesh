import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle2, XCircle, Search, Filter } from "lucide-react";

export default function FeesValidationPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fee Validation</h1>
                    <p className="text-muted-foreground mt-1">Review and validate application fee payments.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h3 className="text-muted-foreground font-medium mb-2">Pending Validation</h3>
                    <div className="text-3xl font-bold tracking-tight">24</div>
                </div>
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h3 className="text-muted-foreground font-medium mb-2">Validated Today</h3>
                    <div className="text-3xl font-bold tracking-tight text-green-600">12</div>
                </div>
                <div className="bg-card rounded-xl border shadow-sm p-6">
                    <h3 className="text-muted-foreground font-medium mb-2">Discrepancies</h3>
                    <div className="text-3xl font-bold tracking-tight text-red-600">3</div>
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-muted/20">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by Proposal/Transaction No..."
                            className="w-full pl-9 pr-4 py-2 bg-background rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" /> Filter
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-muted-foreground">
                                <th className="h-12 px-4 text-left font-medium">Proposal No</th>
                                <th className="h-12 px-4 text-left font-medium">Sector</th>
                                <th className="h-12 px-4 text-left font-medium">Amount Required</th>
                                <th className="h-12 px-4 text-left font-medium">Amount Paid</th>
                                <th className="h-12 px-4 text-left font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                    <td className="p-4 font-mono">SIA/MH/MIN/{12400 + i}/2026</td>
                                    <td className="p-4">Mining</td>
                                    <td className="p-4 font-medium">₹1,50,000</td>
                                    <td className="p-4 font-medium text-green-600">₹1,50,000</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 shadow-none">
                                                <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                                            </Button>
                                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 shadow-none">
                                                <XCircle className="h-4 w-4 mr-1" /> Reject
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
