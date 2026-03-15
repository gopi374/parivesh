'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronRight, ChevronLeft, Upload, CreditCard, ClipboardList, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/storage-utils';
import { useAuth } from '@/lib/auth-context';

const steps = [
    'Basic Information',
    'Project Details',
    'Sector Selection',
    'Environmental Impact',
    'Document Upload',
    'Fee Payment'
];

export default function NewApplication() {
    const router = useRouter();
    const { user, token } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        details: {
            location: '',
            cost: '',
            area: ''
        },
        sector: '',
        environmentalImpact: {
            airQuality: '',
            waterUsage: '',
            wasteManagement: ''
        },
        documents: [] as { name: string; url: string; category: string }[],
        paymentStatus: 'pending'
    });

    const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: number }>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedInputChange = (parent: string, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...(prev[parent as keyof typeof prev] as object), [field]: value }
        }));
    };

    const nextStep = async () => {
        if (currentStep === steps.length - 1) {
            await handleSubmit();
        } else {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (!token) {
                toast.error("You must be logged in to submit an application.");
                return;
            }

            const response = await fetch('/api/proposals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to submit application');

            toast.success("Application submitted successfully!");
            router.push('/dashboard/proponent/applications');
        } catch (error) {
            console.error('Submission error:', error);
            toast.error("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileUpload = async (category: string, file: File) => {
        if (!file) return;

        setUploadingFiles(prev => ({ ...prev, [category]: 0 }));
        try {
            if (!user) throw new Error("Authentication required");

            const path = `proposals/${user.id}/${Date.now()}_${file.name}`;
            const url = await uploadFile(file, path, (progress) => {
                setUploadingFiles(prev => ({ ...prev, [category]: progress }));
            });

            setFormData(prev => ({
                ...prev,
                documents: [...prev.documents, { name: file.name, url, category }]
            }));
            toast.success(`${category} uploaded successfully!`);
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error(`Failed to upload ${category}: ${error.message}`);
        } finally {
            setUploadingFiles(prev => {
                const newState = { ...prev };
                delete newState[category];
                return newState;
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary">New Environmental Clearance</h1>
                <p className="text-muted-foreground mt-1">Please fill in all the details accurately for scrutiny.</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1 relative min-w-[80px]">
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
                                <Input 
                                    id="title" 
                                    placeholder="Enter Full Project Title" 
                                    className="h-12" 
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Clearance Category</Label>
                                <Select 
                                    value={formData.category as string}
                                    onValueChange={(val) => handleInputChange('category', val ?? '')}
                                >
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
                                <Textarea 
                                    id="desc" 
                                    placeholder="Provide a brief summary of the proposed project..." 
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="location">Project Location (State/District)</Label>
                                <Input 
                                    id="location" 
                                    placeholder="e.g. Karnataka, Bangalore" 
                                    className="h-12"
                                    value={formData.details.location}
                                    onChange={(e) => handleNestedInputChange('details', 'location', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cost">Estimated Project Cost (₹ Crores)</Label>
                                <Input 
                                    id="cost" 
                                    type="number"
                                    placeholder="Enter amount" 
                                    className="h-12"
                                    value={formData.details.cost}
                                    onChange={(e) => handleNestedInputChange('details', 'cost', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="area">Total Area Required (Hectares)</Label>
                                <Input 
                                    id="area" 
                                    placeholder="Enter area" 
                                    className="h-12"
                                    value={formData.details.area}
                                    onChange={(e) => handleNestedInputChange('details', 'area', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <Label>Select Industry Sector</Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['Infrastructure', 'Mining', 'Industry', 'Thermal Power', 'Nuclear Power'].map((s) => (
                                    <div 
                                        key={s}
                                        onClick={() => handleInputChange('sector', s)}
                                        className={cn(
                                            "p-4 border rounded-xl cursor-pointer transition-all hover:border-primary/50",
                                            formData.sector === s ? "border-primary bg-primary/5 shadow-sm" : "bg-card"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-4 h-4 rounded-full border-2", formData.sector === s ? "border-primary bg-primary" : "border-muted")} />
                                            <span className="font-medium text-sm">{s}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label>Air Quality Impact</Label>
                                <Textarea 
                                    placeholder="Describe impact on air quality..."
                                    value={formData.environmentalImpact.airQuality}
                                    onChange={(e) => handleNestedInputChange('environmentalImpact', 'airQuality', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Water Usage (m³/day)</Label>
                                <Input 
                                    placeholder="Estimated usage"
                                    value={formData.environmentalImpact.waterUsage}
                                    onChange={(e) => handleNestedInputChange('environmentalImpact', 'waterUsage', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {['Pre-Feasibility Report', 'EIA Report', 'EMP Document', 'Land Ownership Docs'].map((category, i) => {
                                    const isUploading = uploadingFiles[category] !== undefined;
                                    const uploadedDoc = formData.documents.find(d => d.category === category);

                                    return (
                                        <div key={i} className={cn(
                                            "p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all relative overflow-hidden",
                                            uploadedDoc ? "border-green-500 bg-green-50/30" : "hover:bg-accent/5"
                                        )}>
                                            {isUploading && (
                                                <div 
                                                    className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300"
                                                    style={{ width: `${uploadingFiles[category]}%` }}
                                                />
                                            )}
                                            
                                            <div className={cn(
                                                "p-3 rounded-full transition-colors",
                                                uploadedDoc ? "bg-green-100 text-green-600" : "bg-secondary text-primary"
                                            )}>
                                                {uploadedDoc ? <Check className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
                                            </div>
                                            
                                            <div className="text-center">
                                                <div className="text-sm font-bold">{category}</div>
                                                <div className="text-[10px] text-muted-foreground">
                                                    {uploadedDoc ? `Uploaded: ${uploadedDoc.name}` : "PDF, Max 5MB"}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <input
                                                    type="file"
                                                    id={`file-${i}`}
                                                    className="hidden"
                                                    accept=".pdf"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleFileUpload(category, file);
                                                    }}
                                                    disabled={isUploading}
                                                />
                                                <Button 
                                                    variant={uploadedDoc ? "outline" : "default"} 
                                                    size="sm" 
                                                    className="h-8"
                                                    onClick={() => document.getElementById(`file-${i}`)?.click()}
                                                    disabled={isUploading}
                                                >
                                                    {isUploading ? `${Math.round(uploadingFiles[category])}%` : uploadedDoc ? 'Replace' : 'Select File'}
                                                </Button>
                                                {uploadedDoc && (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-8 text-xs text-blue-600"
                                                        onClick={() => window.open(uploadedDoc.url, '_blank')}
                                                    >
                                                        View
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
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
                                <Button 
                                    variant={formData.paymentStatus === 'completed' ? 'secondary' : 'outline'} 
                                    className="h-14 flex-col gap-1"
                                    onClick={() => handleInputChange('paymentStatus', 'completed')}
                                >
                                    <CreditCard className="h-4 w-4" /> {formData.paymentStatus === 'completed' ? 'Paid' : 'Cards'}
                                </Button>
                                <Button variant="outline" className="h-14 flex-col gap-1">UPI</Button>
                                <Button variant="outline" className="h-14 flex-col gap-1">Net Banking</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between p-8 border-t bg-muted/10">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0 || isSubmitting}
                        className="gap-2 h-12 px-6"
                    >
                        <ChevronLeft className="h-4 w-4" /> Previous
                    </Button>
                    <Button
                        onClick={nextStep}
                        disabled={isSubmitting}
                        className="gap-2 h-12 px-6 bg-primary"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            currentStep === steps.length - 1 ? 'Submit Application' : 'Next Step'
                        )}
                        {!isSubmitting && currentStep !== steps.length - 1 && <ChevronRight className="h-4 w-4" />}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
