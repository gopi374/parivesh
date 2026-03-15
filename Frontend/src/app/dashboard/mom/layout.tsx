import DashboardLayout from "@/components/layout/DashboardLayout";

export default function MomDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout role="mom">{children}</DashboardLayout>;
}
