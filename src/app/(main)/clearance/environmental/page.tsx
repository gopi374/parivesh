'use client';
import axios from 'axios';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, FileText, MapPin, Building, Calendar } from 'lucide-react';

export default function EnvironmentalClearancePage() {
    const [step, setStep] = useState<'overview' | 'form'>('overview');
    const [formData, setFormData] = useState({
        name: '',
        projectTitle: '',
        proponent: '',
        sector: '',
        category: '',
        location: '',
        description: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.projectTitle || !formData.proponent || !formData.sector || !formData.category || !formData.location || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            console.log('Submitting form data:', {
                name: formData.name,
                project_title: formData.projectTitle,
                proponent: formData.proponent,
                sector: formData.sector,
                category: formData.category,
                location: formData.location,
                description: formData.description
            });

            const response = await axios.post('/api/environmental', {
                name: formData.name,
                project_title: formData.projectTitle,
                proponent: formData.proponent,
                sector: formData.sector,
                category: formData.category,
                location: formData.location,
                description: formData.description
            });

            console.log('Submission successful:', response.data);
            alert('Environmental application submitted successfully!');

            // Reset form
            setFormData({
                name: '',
                projectTitle: '',
                proponent: '',
                sector: '',
                category: '',
                location: '',
                description: '',
            });
        } catch (error: any) {
            console.error('Submission failed:', error);
            console.error('Error response:', error.response?.data);
            alert(`Failed to submit application: ${error.response?.data?.error || error.message}`);
        }
    };

    if (step === 'form') {
        return (
            <main className="py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-primary mb-2">Step 1: Online Proposal Submission</h1>
                            <p className="text-muted-foreground">Fill out the basic project information to start your Environmental Clearance application.</p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Project Proposal Form
                                </CardTitle>
                                <CardDescription>
                                    Provide essential details about your project for initial screening.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="projectTitle">Project Title *</Label>
                                            <Input
                                                id="projectTitle"
                                                placeholder="Enter project title"
                                                value={formData.projectTitle}
                                                onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="proponent">Proponent Name *</Label>
                                            <Input
                                                id="proponent"
                                                placeholder="Enter proponent name"
                                                value={formData.proponent}
                                                onChange={(e) => setFormData({...formData, proponent: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="sector">Sector *</Label>
                                            <Select
                                                value={formData.sector}
                                                onValueChange={(val) => setFormData({...formData, sector: val!})}
                                                required
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select sector" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="industrial">Industrial</SelectItem>
                                                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                                    <SelectItem value="mining">Mining</SelectItem>
                                                    <SelectItem value="thermal power">Thermal Power</SelectItem>
                                                    <SelectItem value="nuclear">Nuclear</SelectItem>
                                                    <SelectItem value="river valley">River Valley</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Project Category *</Label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(val) => setFormData({...formData, category: val!})}
                                                required
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="A">Category A</SelectItem>
                                                    <SelectItem value="B">Category B</SelectItem>
                                                    <SelectItem value="B1">Category B1</SelectItem>
                                                    <SelectItem value="B2">Category B2</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            Project Location *
                                        </Label>
                                        <Input
                                            id="location"
                                            placeholder="Enter project location (district, state)"
                                            value={formData.location}
                                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Project Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Brief description of the project"
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            rows={4}
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setStep('overview')}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="flex-1">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Submit Proposal
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto space-y-16">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
                            Environmental <span className="text-accent underline decoration-primary/20 underline-offset-8">Clearance</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                            Environmental Clearance (EC) is mandatory for projects listed in the schedule of EIA Notification 2006.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Building, title: "Legislation", detail: "Governed by the E(P) Act 1986 and relevant notifications." },
                            { icon: FileText, title: "Forms Required", detail: "Form 1, Form 1A, Form 2 and Conceptual Plan." },
                            { icon: Calendar, title: "Authority", detail: "MoEF&CC / SEIAA / DEIAA based on project category." },
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
                            ].map((stepText, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center font-black shrink-0 shadow-sm ${
                                        i === 0 ? 'bg-primary text-white border-primary' : 'bg-white border-primary text-primary'
                                    }`}>
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-lg font-medium pt-1 ${i === 0 ? 'text-primary' : 'text-primary/80'}`}>
                                            {stepText}
                                        </p>
                                        {i === 0 && (
                                            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                                                <h4 className="font-semibold text-primary mb-2">Step 1 Details:</h4>
                                                <ul className="text-sm text-muted-foreground space-y-1">
                                                    <li>• Fill out the online proposal form with basic project information</li>
                                                    <li>• Select appropriate project category and sector</li>
                                                    <li>• Provide project location and description</li>
                                                    <li>• Submit for initial screening and validation</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            onClick={() => setStep('form')}
                            className="bg-primary hover:bg-primary/90 text-white font-bold px-12 h-16 rounded-2xl shadow-2xl shadow-primary/20 flex items-center gap-3 text-lg transition-all active:scale-95"
                        >
                            <CheckCircle className="h-6 w-6" />
                            Start New Application
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
