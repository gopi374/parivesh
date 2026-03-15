import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProponentDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout role="proponent">{children}</DashboardLayout>;
}
