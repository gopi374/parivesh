import { Button } from "@/components/ui/button";
import { PlusCircle, Activity, Box } from "lucide-react";

export default function SectorsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sector Parameters</h1>
                    <p className="text-muted-foreground mt-1">Configure validation rules and parameters for different sectors.</p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Sector
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['Mining', 'Infrastructure', 'Thermal Power', 'River Valley'].map((sector) => (
                    <div key={sector} className="bg-card rounded-xl border shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Box className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold">{sector} Sector</h3>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Active
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm py-2 border-b">
                                <span className="text-muted-foreground">Base Fee</span>
                                <span className="font-medium">₹50,000</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b">
                                <span className="text-muted-foreground">SLA Target</span>
                                <span className="font-medium">45 Days</span>
                            </div>
                            <div className="flex justify-between text-sm py-2">
                                <span className="text-muted-foreground">Required Docs</span>
                                <span className="font-medium">12 Types</span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-6 gap-2">
                            <Activity className="h-4 w-4" /> View Parameters
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
