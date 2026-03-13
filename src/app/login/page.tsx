'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, Lock, Mail, UserCircle } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<string>('proponent');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login and redirect to the selected role dashboard
        router.push(`/dashboard/${role}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center text-center space-y-2">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <div className="bg-primary p-2 rounded-lg">
                            <Leaf className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight text-primary">PARIVESH 3.0</span>
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Sign in to your account</h2>
                    <p className="text-muted-foreground">Enter your credentials to access the console</p>
                </div>

                <Card className="border-none shadow-2xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Authentication</CardTitle>
                        <CardDescription>
                            Select your role and provide your login details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="role">Account Role</Label>
                                <Select onValueChange={(val) => setRole(val ?? 'proponent')} defaultValue="proponent">
                                    <SelectTrigger id="role" className="h-12 border-muted hover:border-accent/50 transition-colors">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="proponent">Project Proponent</SelectItem>
                                        <SelectItem value="admin">System Administrator</SelectItem>
                                        <SelectItem value="scrutiny" >Scrutiny Team</SelectItem>
                                        <SelectItem value="mom">MoM Generation Team</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    <Input id="email" type="email" placeholder="name@example.com" className="pl-10 h-12 border-muted" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" icon-size="sm" className="text-xs text-accent hover:underline font-medium">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    <Input id="password" type="password" className="pl-10 h-12 border-muted" required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90 mt-6 shadow-lg shadow-primary/20">
                                Log In
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">New User?</span>
                            </div>
                        </div>
                        <Link href="/register" className="w-full">
                            <Button variant="outline" className="w-full h-12 border-primary text-primary hover:bg-primary/5">
                                Register for Clearance
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-muted-foreground">
                    Protected by Ministry Security Standards. Authorized access only.
                </p>
            </div>
        </div>
    );
}
