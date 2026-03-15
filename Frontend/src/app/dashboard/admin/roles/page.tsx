import { Button } from "@/components/ui/button";
import { PlusCircle, Shield, CheckCircle2 } from "lucide-react";

export default function RolesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Role Assignment</h1>
                    <p className="text-muted-foreground mt-1">Configure roles and permissions for the system.</p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Create Role
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Admin', 'Proponent', 'Scrutiny Officer', 'MoM Officer'].map((role) => (
                    <div key={role} className="bg-card rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{role}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Full access to all {role.toLowerCase()} operations and sensitive data management.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" /> Read Access
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" /> Write Access
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
