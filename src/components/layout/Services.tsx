import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus, Search, FileUp, Calendar, FileText, Download } from "lucide-react";
import Link from "next/link";

const serviceCards = [
    {
        title: "Apply for Clearance",
        description: "Submit new applications for Environment, Forest, Wildlife, or CRZ clearance.",
        icon: FilePlus,
        href: "/register",
        color: "bg-blue-500",
    },
    {
        title: "Track Application",
        description: "Check the real-time status of your submitted environmental applications.",
        icon: Search,
        href: "/dashboard/proponent/track",
        color: "bg-orange-500",
    },
    {
        title: "Document Upload",
        description: "Submit essential documents or respond to EDS sought by the scrutiny team.",
        icon: FileUp,
        href: "/dashboard/proponent/uploads",
        color: "bg-green-500",
    },
    {
        title: "Meeting Records",
        description: "View scheduled EAC/FAC meetings and agendas for various sectors.",
        icon: Calendar,
        href: "#",
        color: "bg-purple-500",
    },
    {
        title: "MOM Archive",
        description: "Download certified Minutes of Meetings and finalized gists.",
        icon: FileText,
        href: "/dashboard/mom/archive",
        color: "bg-red-500",
    },
    {
        title: "Download Certificates",
        description: "Access and download finalized clearance certificates and approval letters.",
        icon: Download,
        href: "#",
        color: "bg-cyan-500",
    },
];

export default function Services() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Integrated Services</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Access all environmental clearance services through our integrated single-window portal designed for efficiency and transparency.
                    </p>
                    <div className="w-20 h-1.5 bg-accent rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceCards.map((service, index) => (
                        <Link key={index} href={service.href}>
                            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-card">
                                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                    <div className={`p-3 rounded-2xl ${service.color} text-white group-hover:scale-110 transition-transform`}>
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
