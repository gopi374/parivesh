'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center text-center space-y-2">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <div className="bg-primary p-2 rounded-lg">
                            <Leaf className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight text-primary">PARIVESH 3.0</span>
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Reset your password</h2>
                    <p className="text-muted-foreground">We'll send you a link to reset your password</p>
                </div>

                <Card className="border-none shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl">Password Recovery</CardTitle>
                        <CardDescription>
                            Enter the email address associated with your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    <Input id="email" type="email" placeholder="name@example.com" className="pl-10 h-12 border-muted" required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90 mt-4">
                                Send Reset Link
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Link href="/login" className="flex items-center gap-2 text-sm text-primary hover:underline font-medium mx-auto">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
