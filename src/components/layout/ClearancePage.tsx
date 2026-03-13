import { Shield, FileText, Scale, CheckCircle } from 'lucide-react';

export default function ClearancePage({
    type = "Environmental",
    description = "Application for Environmental Clearance (EC) as per the EIA Notification 2006."
}) {
    return (
        <main className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto space-y-16">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
                            {type} <span className="text-accent underline decoration-primary/20 underline-offset-8">Clearance</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Legislation", detail: "Governed by the E(P) Act 1986 and relevant notifications." },
                            { icon: FileText, title: "Forms Required", detail: "Form 1, Form 1A, Form 2 and Conceptual Plan." },
                            { icon: Scale, title: "Authority", detail: "MoEF&CC / SEIAA / DEIAA based on project category." },
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[32px] border bg-card hover:border-primary transition-all group">
                                <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.detail}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8 bg-muted/20 p-8 md:p-12 rounded-[48px] border">
                        <h2 className="text-3xl font-bold text-primary">Process Overview</h2>
                        <div className="space-y-6">
                            {[
                                "Online submission of proposal on PARIVESH portal.",
                                "Technical scrutiny and EAC/SEAC examination.",
                                "Recommendation by the Appraisal Committee.",
                                "Grant or Rejection of Clearance by the Competent Authority."
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="h-10 w-10 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary font-black shrink-0 shadow-sm">
                                        {i + 1}
                                    </div>
                                    <p className="text-lg font-medium text-primary/80 pt-1">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-primary hover:bg-primary/90 text-white font-bold px-12 h-16 rounded-2xl shadow-2xl shadow-primary/20 flex items-center gap-3 text-lg transition-all active:scale-95">
                            <CheckCircle className="h-6 w-6" />
                            Start New Application
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

// Specializations for static gen if needed, but here we just export the components for specific routes
export function Environmental() { return <ClearancePage type="Environmental" description="Environmental Clearance (EC) is mandatory for projects listed in the schedule of EIA Notification 2006." /> }
export function Forest() { return <ClearancePage type="Forest" description="Forest Clearance (FC) is required for diversion of forest land for non-forestry purposes under Forest (Conservation) Act, 1980." /> }
export function Wildlife() { return <ClearancePage type="Wild Life" description="Wildlife Clearance (WLC) is required for projects located within Protected Areas (National Parks/Sanctuaries) or within Eco-Sensitive Zones." /> }
export function CRZ() { return <ClearancePage type="CRZ" description="Coastal Regulation Zone (CRZ) Clearance is mandatory for activities in coastal areas under CRZ Notification 2011/2019." /> }
