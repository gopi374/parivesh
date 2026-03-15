import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ScrutinyDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout role="scrutiny">{children}</DashboardLayout>;
}
