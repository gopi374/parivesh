'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, User, Mail, Lock, Phone, Building2, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        orgName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    displayName: `${formData.firstName} ${formData.lastName}`.trim(),
                    phoneNumber: formData.phone,
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Registration failed');
            }

            router.push('/login?registered=true');
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || "An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-20">
            <div className="w-full max-w-2xl space-y-8">
                <div className="flex flex-col items-center text-center space-y-2">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <div className="bg-primary p-2 rounded-lg">
                            <Leaf className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight text-primary">PARIVESH 3.0</span>
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Create your Proponent Account</h2>
                    <p className="text-muted-foreground">Start your environmental clearance journey today</p>
                </div>

                <Card className="border-none shadow-2xl overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                    <CardHeader className="space-y-1 p-8">
                        <CardTitle className="text-2xl">Registration</CardTitle>
                        <CardDescription>
                            Complete the form below to register as a Project Proponent.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <form onSubmit={handleRegister} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                        <Input id="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className="pl-10 h-12 border-muted" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="h-12 border-muted" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="orgName">Organization / Company Name</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    <Input id="orgName" value={formData.orgName} onChange={handleChange} placeholder="Green Energy Solutions Pvt Ltd" className="pl-10 h-12 border-muted" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Official Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                        <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" className="pl-10 h-12 border-muted" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Mobile Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                        <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="pl-10 h-12 border-muted" required />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Create Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                        <Input id="password" type="password" value={formData.password} onChange={handleChange} className="pl-10 h-12 border-muted" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                        <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="pl-10 h-12 border-muted" required />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-2 pt-2">
                                <input type="checkbox" id="terms" className="mt-1.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" required />
                                <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-snug">
                                    I agree to the <Link href="#" className="text-accent underline hover:text-accent/80">Terms of Service</Link> and <Link href="#" className="text-accent underline hover:text-accent/80">Privacy Policy</Link> for environmental governance.
                                </Label>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-primary hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20">
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="p-8 pt-0 border-t bg-secondary/10 text-center flex justify-center py-6">
                        <p className="text-sm text-muted-foreground">
                            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in here</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
