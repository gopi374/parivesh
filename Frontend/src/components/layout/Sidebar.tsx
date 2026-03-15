'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    CheckSquare,
    ClipboardList,
    Search,
    PlusCircle,
    CreditCard,
    FileUp,
    Archive,
    BarChart3
} from 'lucide-react';

interface SidebarItem {
    title: string;
    href: string;
    icon: any;
}

interface SidebarProps {
    role: 'admin' | 'proponent' | 'scrutiny' | 'mom';
}

const roleMenus: Record<string, SidebarItem[]> = {
    admin: [
        { title: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
        { title: 'User Management', href: '/dashboard/admin/users', icon: Users },
        { title: 'Role Assignment', href: '/dashboard/admin/roles', icon: CheckSquare },
        { title: 'Template Settings', href: '/dashboard/admin/templates', icon: FileText },
        { title: 'Sector Params', href: '/dashboard/admin/sectors', icon: Settings },
    ],
    proponent: [
        { title: 'Dashboard', href: '/dashboard/proponent', icon: LayoutDashboard },
        { title: 'New Application', href: '/dashboard/proponent/new', icon: PlusCircle },
        { title: 'My Applications', href: '/dashboard/proponent/applications', icon: ClipboardList },
        { title: 'Track Status', href: '/dashboard/proponent/track', icon: Search },
        { title: 'Upload Docs', href: '/dashboard/proponent/uploads', icon: FileUp },
        { title: 'Payment', href: '/dashboard/proponent/payment', icon: CreditCard },
    ],
    scrutiny: [
        { title: 'Assigned Tasks', href: '/dashboard/scrutiny', icon: LayoutDashboard },
        { title: 'Verification', href: '/dashboard/scrutiny/verify', icon: CheckSquare },
        { title: 'Fee Validation', href: '/dashboard/scrutiny/fees', icon: CreditCard },
        { title: 'Deficiencies', href: '/dashboard/scrutiny/deficiencies', icon: FileText },
    ],
    mom: [
        { title: 'Referred Tasks', href: '/dashboard/mom', icon: LayoutDashboard },
        { title: 'Meeting Gist', href: '/dashboard/mom/gist', icon: FileText },
        { title: 'MoM Editor', href: '/dashboard/mom/editor', icon: ClipboardList },
        { title: 'Archive', href: '/dashboard/mom/archive', icon: Archive },
    ],
};

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const menuItems = roleMenus[role] || [];

    return (
        <div className="flex flex-col w-64 h-full bg-card border-r text-card-foreground">
            <div className="p-6">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {role.replace(/^\w/, (c) => c.toUpperCase())} Console
                </h2>
            </div>
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-primary")} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground">
                    <Settings className="h-4 w-4" />
                    Settings
                </div>
            </div>
        </div>
    );
}
