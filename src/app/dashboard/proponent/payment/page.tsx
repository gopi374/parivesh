'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Landmark, Wallet, QrCode, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function PaymentPage() {
    const [method, setMethod] = useState('qr');

    return (
        <DashboardLayout role="proponent">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Payment Portal</h1>
                    <p className="text-muted-foreground mt-1">Settle application fees securely via BharatKosh integrated gateway.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle>Select Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { id: 'qr', label: 'UPI / QR Code', icon: QrCode },
                                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                                    { id: 'banking', label: 'Net Banking', icon: Landmark },
                                    { id: 'wallet', label: 'Digital Wallets', icon: Wallet },
                                ].map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setMethod(item.id)}
                                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${method === item.id ? 'border-primary bg-primary/5' : 'hover:border-primary/20 bg-card border-transparent shadow-sm'}`}
                                    >
                                        <div className={`p-3 rounded-xl ${method === item.id ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}>
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <span className="font-bold text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-primary text-white overflow-hidden">
                            <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="space-y-2">
                                    <p className="text-white/70 text-sm uppercase font-bold tracking-widest">Scan to Pay via UPI</p>
                                    <div className="bg-white p-4 rounded-3xl shadow-2xl">
                                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-black text-xs">
                                            QR CODE PLACEHOLDER
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xl font-bold">₹ 25,000.00</p>
                                    <p className="text-xs text-white/60 uppercase">Amount Payable after CSR benefits</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-none shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Application ID</span>
                                    <span className="font-mono font-bold">EC-2026-009</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Base Fee</span>
                                    <span>₹ 24,000</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Processing Fee</span>
                                    <span>₹ 1,000</span>
                                </div>
                                <div className="h-px bg-border my-2" />
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">₹ 25,000</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-accent hover:bg-accent/90 h-12 text-lg shadow-lg shadow-accent/20">
                                    Verify & Pay Now
                                </Button>
                            </CardFooter>
                        </Card>

                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-green-700">
                            <CheckCircle2 className="h-5 w-5 shrink-0" />
                            <p className="text-[10px] font-medium leading-normal">Your transaction is protected by 256-bit SSL encryption and BharatKosh security standards.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
