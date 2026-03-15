'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Lock, Mail, Loader2, CheckCircle2, Shield, User, Search, Users, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [step, setStep] = useState(1); // 1: Login, 2: Role Selection
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (searchParams.get('registered')) {
            setSuccessMessage("Account created successfully! Please log in.");
        }
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Invalid credentials');
            }

            const { token, user } = await response.json();

            const inferredRole = user.role || 'proponent';
            const data = {
                firstName: user.displayName || user.email?.split('@')[0] || 'User',
                email: user.email,
                role: inferredRole,
                id: user.id,
            };

            // If the user has a single role (non-admin), log them straight into that portal.
            if (inferredRole !== 'admin') {
                const basicUser = {
                    id: data.id,
                    email: data.email,
                    name: data.firstName || 'User',
                };
                login(basicUser, inferredRole, token);
                router.push(`/dashboard/${inferredRole}`);
                return;
            }

            // Admin can choose which workspace to enter.
            setUserData({ ...data, _token: token } as any);
            setUserRole(inferredRole);
            setStep(2);
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "An unexpected error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    const enterPortal = (role: string) => {
        if (!userData || !(userData as any)._token) {
            setError('Please log in again.');
            setStep(1);
            return;
        }

        const basicUser = {
            id: userData.id,
            email: userData.email,
            name: userData.firstName || 'User',
        };

        login(basicUser, role, (userData as any)._token);
        router.push(`/dashboard/${role}`);
    };

    const roles = [
        { id: 'proponent', title: 'Proponent', desc: 'Manage applications and track clearance', icon: Leaf },
        { id: 'scrutiny', title: 'Scrutiny Officer', desc: 'Technical review and validation', icon: Search },
        { id: 'mom', title: 'MoM Committee', desc: 'Final decision making & AI synthesis', icon: Users },
        { id: 'admin', title: 'System Administrator', desc: 'Master access and system control', icon: Shield },
    ];

    const availableRoles = userRole === 'admin' ? roles : roles.filter(r => r.id === userRole);

    if (step === 2) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
                <div className="w-full max-w-2xl space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
                            <Shield className="h-10 w-10 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">Select Portal</h2>
                        <p className="text-muted-foreground">Welcome back, {userData?.firstName || 'User'}. Please choose your workspace.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableRoles.map((role) => (
                            <Card 
                                key={role.id} 
                                className="group hover:border-primary transition-all cursor-pointer shadow-md hover:shadow-xl border-2 border-transparent"
                                onClick={() => enterPortal(role.id)}
                            >
                                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                    <div className="p-3 bg-secondary rounded-xl group-hover:bg-primary/10 transition-colors">
                                        <role.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{role.title}</CardTitle>
                                        <CardDescription className="text-xs line-clamp-1">{role.desc}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex justify-between items-center text-xs font-medium text-muted-foreground pt-0">
                                    <span>Proceed to {role.title} Dashboard</span>
                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-primary" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button variant="ghost" className="text-muted-foreground" onClick={() => setStep(1)}>
                            Login with another account
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

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
                            Provide your login details to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                            {successMessage && (
                                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    {successMessage}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com" 
                                        className="pl-10 h-12 border-muted" 
                                        required 
                                    />
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
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-12 border-muted" 
                                        required 
                                    />
                                </div>
                            </div>
                            <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-primary hover:bg-primary/90 mt-6 shadow-lg shadow-primary/20">
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Checking credentials...
                                    </>
                                ) : (
                                    'Log In'
                                )}
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
