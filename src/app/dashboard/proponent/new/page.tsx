'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronRight, ChevronLeft, Upload, CreditCard, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    'Basic Information',
    'Project Details',
    'Sector Selection',
    'Environmental Impact',
    'Document Upload',
    'Fee Payment'
];

export default function NewApplication() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    return (
        <DashboardLayout role="proponent">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">New Environmental Clearance</h1>
                    <p className="text-muted-foreground mt-1">Please fill in all the details accurately for scrutiny.</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1 relative">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                                    index < currentStep ? "bg-primary border-primary text-primary-foreground" :
                                        index === currentStep ? "border-primary text-primary bg-background shadow-md scale-110" :
                                            "border-muted text-muted-foreground"
                                )}
                            >
                                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                            </div>
                            <span className={cn(
                                "hidden md:block text-[10px] font-medium uppercase tracking-tighter",
                                index === currentStep ? "text-primary" : "text-muted-foreground"
                            )}>
                                {step}
                            </span>
                            {index < steps.length - 1 && (
                                <div className={cn(
                                    "absolute h-0.5 top-4 left-[calc(50%+1rem)] right-[calc(-50%+1rem)] z-[-1]",
                                    index < currentStep ? "bg-primary" : "bg-muted"
                                )} />
                            )}
                        </div>
                    ))}
                </div>

                <Card className="border-none shadow-xl">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="text-xl text-primary">{steps[currentStep]}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        {currentStep === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Project Title</Label>
                                    <Input id="title" placeholder="Enter Full Project Title" className="h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Clearance Category</Label>
                                    <Select>
                                        <SelectTrigger className="h-12"><SelectValue placeholder="Select Category" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="a">Category A</SelectItem>
                                            <SelectItem value="b1">Category B1</SelectItem>
                                            <SelectItem value="b2">Category B2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="desc">Short Project Description</Label>
                                    <Textarea id="desc" placeholder="Provide a brief summary of the proposed project..." rows={4} />
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {['Pre-Feasibility Report', 'EIA Report', 'EMP Document', 'Land Ownership Docs'].map((doc, i) => (
                                        <div key={i} className="p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-accent/5 transition-colors cursor-pointer group">
                                            <div className="p-3 bg-secondary rounded-full group-hover:bg-primary/10 transition-colors">
                                                <Upload className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-bold">{doc}</div>
                                                <div className="text-[10px] text-muted-foreground">PDF, Max 5MB</div>
                                            </div>
                                            <Button variant="outline" size="sm" className="h-8">Select File</Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="space-y-8 flex flex-col items-center">
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold">Total Payable: ₹25,000</h3>
                                    <p className="text-muted-foreground">Application Processing Fee</p>
                                </div>
                                <div className="w-48 h-48 bg-card border-4 border-primary/20 rounded-2xl flex items-center justify-center relative group">
                                    <div className="text-muted-foreground p-4 text-center text-xs">QR Code Mockup <br /> Scan to Pay</div>
                                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="w-full max-w-sm grid grid-cols-3 gap-4">
                                    <Button variant="outline" className="h-14 flex-col gap-1"><CreditCard className="h-4 w-4" /> Cards</Button>
                                    <Button variant="outline" className="h-14 flex-col gap-1">UPI</Button>
                                    <Button variant="outline" className="h-14 flex-col gap-1">Net Banking</Button>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other steps to keep it concise */}
                        {[1, 2, 3].includes(currentStep) && (
                            <div className="flex flex-col items-center justify-center border-none py-20 text-muted-foreground">
                                <ClipboardList className="h-12 w-12 mb-4 opacity-20" />
                                <p>Section: {steps[currentStep]} - Mock Form Inputs Placeholder</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between p-8 border-t bg-muted/10">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="gap-2 h-12 px-6"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </Button>
                        <Button
                            onClick={nextStep}
                            className="gap-2 h-12 px-6 bg-primary"
                        >
                            {currentStep === steps.length - 1 ? 'Submit Application' : 'Next Step'}
                            {currentStep !== steps.length - 1 && <ChevronRight className="h-4 w-4" />}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </DashboardLayout>
    );
}
