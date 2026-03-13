export default function AboutPage() {
    return (
        <main className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter">About PARIVESH 3.0</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            PARIVESH (Pro-Active and Responsive facilitation by Interactive, Virtuous and Environmental Single-window Hub) is a web-based, role-based workflow application which has been developed for online submission and monitoring of the proposals submitted by the proponents for seeking Environment, Forest, Wildlife and CRZ Clearances from Central, State and district level authorities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-muted/30 rounded-3xl border space-y-4">
                            <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
                            <p className="text-sm text-muted-foreground">To promote "Ease of Doing Business" with transparency while ensuring environmental sustainability through digital transformation.</p>
                        </div>
                        <div className="p-8 bg-primary text-white rounded-3xl space-y-4 shadow-xl">
                            <h2 className="text-2xl font-bold">Key Objectives</h2>
                            <ul className="text-sm space-y-2 opacity-80">
                                <li>• Single window hub for all clearances</li>
                                <li>• Transparent monitoring and tracking</li>
                                <li>• Role-based secure workflow</li>
                                <li>• Paperless digital governance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
