import { Button } from "@/components/ui/button";
import { PlusCircle, Search, User, Mail, ShieldAlert } from "lucide-react";

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground mt-1">Manage platform users and access levels.</p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add User
                </Button>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-6">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-9 pr-4 py-2 bg-secondary/50 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                <div className="rounded-md border">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-muted-foreground">
                                <th className="h-12 px-4 text-left font-medium">Name</th>
                                <th className="h-12 px-4 text-left font-medium">Email</th>
                                <th className="h-12 px-4 text-left font-medium">Role</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="font-medium">User {i}</span>
                                    </td>
                                    <td className="p-4 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3 w-3" />
                                            user{i}@example.com
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                            <ShieldAlert className="h-3 w-3" />
                                            Admin
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            Active
                                        </span>
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
