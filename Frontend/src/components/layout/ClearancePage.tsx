import { Shield, FileText, Scale, CheckCircle, Download, FileCheck, Info } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface DocumentInfo {
    title: string;
    description: string;
    size: string;
    url: string;
}

interface ClearancePageProps {
    type: string;
    description: string;
    longDescription?: string;
    statutoryAuthority?: string;
    requiredForms?: string;
    documents: DocumentInfo[];
    processSteps: string[];
}

export default function ClearancePage({
    type = "Environmental",
    description = "Application for Environmental Clearance (EC) as per the EIA Notification 2006.",
    longDescription = "Environmental Clearance ensures that the proposed project balances economic development with environmental sustainability. Central to this process is the mandatory evaluation of potential environmental impacts before project commencement, thus mitigating risks and ensuring compliance with national ecological standards.",
    statutoryAuthority = "Governed by the Ministry of Environment, Forest and Climate Change (MoEF&CC) or respective State/District level authorities (SEIAA/DEIAA) based on project category.",
    requiredForms = "Typically requires Form-1, Pre-Feasibility Report (PFR), and an approved Terms of Reference (ToR) depending on the project category (A/B1/B2).",
    documents = [],
    processSteps = [
        "Online submission of proposal on PARIVESH portal.",
        "Technical scrutiny and EAC/SEAC examination.",
        "Recommendation by the Appraisal Committee.",
        "Grant or Rejection of Clearance by the Competent Authority."
    ]
}: ClearancePageProps) {
    return (
        <main className="py-24 bg-background min-h-screen">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Header Section */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide">
                            <Shield className="h-4 w-4" />
                            Official Government Clearance
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
                            {type} <span className="text-accent underline decoration-primary/20 underline-offset-8">Clearance</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed font-medium">
                            {description}
                        </p>
                    </div>

                    {/* Detailed Info Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                                <p className="leading-relaxed">{longDescription}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div className="p-6 rounded-3xl border bg-card hover:shadow-lg transition-all">
                                    <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                        <Scale className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Statutory Authority</h3>
                                    <p className="text-sm text-muted-foreground">{statutoryAuthority}</p>
                                </div>
                                <div className="p-6 rounded-3xl border bg-card hover:shadow-lg transition-all">
                                    <div className="h-12 w-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                                        <FileCheck className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Required Forms</h3>
                                    <p className="text-sm text-muted-foreground">{requiredForms}</p>
                                </div>
                            </div>

                            {/* Process Steps */}
                            <div className="bg-secondary/30 p-8 rounded-3xl border mt-12">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <Info className="h-6 w-6 text-primary" />
                                    Approval Process
                                </h3>
                                <div className="space-y-6">
                                    {processSteps.map((step, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm text-sm">
                                                {i + 1}
                                            </div>
                                            <p className="text-base font-medium text-foreground">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Downloads Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-card border rounded-3xl p-6 shadow-sm sticky top-24">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    Reference Documents
                                </h3>
                                <div className="space-y-4">
                                    {documents.length > 0 ? documents.map((doc, i) => (
                                        <a key={i} href={doc.url} className="group block p-4 rounded-2xl border hover:border-primary hover:bg-primary/5 transition-all text-left w-full">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">{doc.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{doc.description}</p>
                                                </div>
                                                <div className="bg-muted group-hover:bg-primary group-hover:text-white rounded-full p-2 shrink-0 transition-colors">
                                                    <Download className="h-4 w-4" />
                                                </div>
                                            </div>
                                            <div className="mt-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                <Badge variant="secondary" className="text-[10px] px-2 py-0 h-4">PDF</Badge>
                                                {doc.size}
                                            </div>
                                        </a>
                                    )) : (
                                        <p className="text-sm text-muted-foreground text-center py-8">No documents currently available for this category.</p>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t">
                                    <p className="text-sm font-medium mb-4 text-center">Ready to begin the process?</p>
                                    <Link href="/dashboard/proponent/new">
                                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95">
                                            <CheckCircle className="h-5 w-5" />
                                            Apply Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// Data specific to each clearance type
const environmentalDocs = [
    { title: "EIA Notification 2006", description: "Official Gazette Notification regarding Environmental Clearances", size: "1.2 MB", url: "#" },
    { title: "Form-1 Template", description: "Standard application format for EC", size: "450 KB", url: "#" },
    { title: "Sector Specific Guidelines", description: "Detailed manual for preparing EIA/EMP reports", size: "3.4 MB", url: "#" }
];

const forestDocs = [
    { title: "Forest (Conservation) Act, 1980", description: "The overarching act governing forest clearance", size: "890 KB", url: "#" },
    { title: "Form-A Template", description: "Application form for seeking prior approval under FCA", size: "320 KB", url: "#" },
    { title: "Compensatory Afforestation Guidelines", description: "Rules regarding CA scheme and fund deposits", size: "2.1 MB", url: "#" }
];

const wildlifeDocs = [
    { title: "Wildlife (Protection) Act, 1972", description: "Legislation for protection of plants and animal species", size: "1.5 MB", url: "#" },
    { title: "NBWL Standing Committee Guidelines", description: "Procedures for wildlife clearance inside protected areas", size: "1.1 MB", url: "#" },
    { title: "Eco-Sensitive Zone Demarcation", description: "Instructions regarding activities in ESZs", size: "2.8 MB", url: "#" }
];

const crzDocs = [
    { title: "CRZ Notification 2019", description: "Comprehensive guidelines for coastal regulation zones", size: "1.8 MB", url: "#" },
    { title: "Form-1 for CRZ", description: "Application format for obtaining CRZ clearance", size: "400 KB", url: "#" },
    { title: "CZMP Preparation Rules", description: "Coastal Zone Management Plan formulation guidelines", size: "3.2 MB", url: "#" }
];


export function Environmental() { 
    return <ClearancePage 
        type="Environmental" 
        description="Environmental Clearance (EC) is mandatory for projects listed in the schedule of EIA Notification 2006." 
        longDescription="An Environmental Clearance ensures that any proposed developmental, industrial, or infrastructure project balances economic goals with environmental sustainability. Central to this process is the mandatory evaluation of potential environmental impacts (via an Environmental Impact Assessment report) before project commencement, thus mitigating risks, ensuring public consultation, and verifying compliance with national ecological standards."
        statutoryAuthority="Governed by the Ministry of Environment, Forest and Climate Change (MoEF&CC) or respective State/District level authorities (SEIAA/DEIAA) based on project category."
        requiredForms="Typically requires Form-1, Form-1A (for construction projects), Pre-Feasibility Report (PFR), and an approved Terms of Reference (ToR)."
        documents={environmentalDocs}
        processSteps={[
            "Online submission of Form-1/1A with Pre-Feasibility Report.",
            "Scoping and grant of Terms of Reference (ToR) by Expert Appraisal Committee.",
            "Public Consultation and drafting final EIA/EMP report.",
            "Appraisal by EAC/SEAC and final grant/rejection by Regulatory Authority."
        ]}
    /> 
}

export function Forest() { 
    return <ClearancePage 
        type="Forest" 
        description="Forest Clearance (FC) is required for diversion of forest land for non-forestry purposes under Forest (Conservation) Act, 1980." 
        longDescription="Forest Clearance, governed by the Forest (Conservation) Act of 1980, is a critical regulatory mechanism ensuring that vital forest ecosystems are generally not disturbed. If diversion of forest land for non-forestry uses (like mining or infrastructure) is unavoidable, this clearance mandates rigorous appraisal and the implementation of Compensatory Afforestation to offset ecological losses."
        statutoryAuthority="Governed by the Forest Advisory Committee (FAC) at the MoEF&CC level or Regional Empowered Committee (REC) at the Regional Office level."
        requiredForms="Requires Form-A (for general diversions) or Form-B/C (for prospecting/mining), along with a differential GPS map of the proposed area and compensatory afforestation scheme."
        documents={forestDocs}
        processSteps={[
            "Submission of Form-A on PARIVESH by User Agency.",
            "Site inspection and recommendations by Nodal Officer / DFO / Conservator of Forests.",
            "Review by State Government and forwarding to MoEF&CC/Regional Office.",
            "In-Principle (Stage-I) approval followed by Stage-II clearance upon condition compliance."
        ]}
    /> 
}

export function Wildlife() { 
    return <ClearancePage 
        type="Wild Life" 
        description="Wildlife Clearance (WLC) is required for projects located within Protected Areas (National Parks/Sanctuaries) or within Eco-Sensitive Zones." 
        longDescription="Wildlife Clearance aims to protect India's biodiversity. Any activity proposed within notified National Parks, Wildlife Sanctuaries, Tiger Reserves, or their demarcated Eco-Sensitive Zones (ESZ) must be scrutinized. The clearance process evaluates the potential impact on wildlife habitats and corridors, ensuring that development does not intrude upon or harm protected species."
        statutoryAuthority="Governed by the National Board for Wildlife (NBWL) chaired by the Hon'ble Prime Minister, and State Boards for Wildlife (SBWL)."
        requiredForms="Requires Part I and Part II forms filed by the user agency and Chief Wildlife Warden, alongside a biodiversity impact assessment and mitigation plan."
        documents={wildlifeDocs}
        processSteps={[
            "Proposal submission involving Protected Area/ESZ via PARIVESH.",
            "Review and recommendation by the Chief Wildlife Warden of the State.",
            "Approval by the State Board for Wildlife (SBWL).",
            "Final consideration and recommendation by the Standing Committee of NBWL (National Board for Wildlife)."
        ]}
    /> 
}

export function CRZ() { 
    return <ClearancePage 
        type="CRZ" 
        description="Coastal Regulation Zone (CRZ) Clearance is mandatory for activities in coastal areas under CRZ Notification 2011/2019." 
        longDescription="Coastal Regulation Zones are ecologically sensitive and highly vulnerable to climate change. The CRZ Clearance ensures that activities near the coastline (up to 500m from the High Tide Line) are regulated to protect coastal habitats, marine life, and local fishing communities, in accordance with the approved Coastal Zone Management Plans (CZMP)."
        statutoryAuthority="Governed by the National Coastal Zone Management Authority (NCZMA) at the central level and State Coastal Zone Management Authority (SCZMA) at the state level."
        requiredForms="Requires Form-1 for CRZ, an accredited CRZ map (1:4000 scale) indicating high/low tide lines, and a marine Environmental Impact Assessment report."
        documents={crzDocs}
        processSteps={[
            "Submission of application with CRZ map prepared by authorized agency.",
            "Scrutiny and recommendation by State Coastal Zone Management Authority (SCZMA).",
            "Forwarding of recommendation to MoEF&CC.",
            "Appraisal by Expert Appraisal Committee (CRZ) and grant of final clearance."
        ]}
    /> 
}
