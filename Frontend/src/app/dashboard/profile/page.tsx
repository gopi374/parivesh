'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mail, Phone, User, Shield, Briefcase, Loader2, Save, Trash2 } from 'lucide-react';
import { uploadFile } from '@/lib/storage-utils';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth-context';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const [formData, setFormData] = useState({
        displayName: '',
        phoneNumber: '',
        bio: '',
        photoURL: ''
    });
    const { user: authUser, token } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error('Failed to load profile');
                const data = await response.json();
                setUser(data);
                setFormData({
                    displayName: data.displayName || '',
                    phoneNumber: data.phoneNumber || '',
                    bio: data.bio || '',
                    photoURL: data.photoURL || '',
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load profile");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const path = `profiles/${authUser?.id}/${Date.now()}_${file.name}`;
            const url = await uploadFile(file, path);
            setFormData(prev => ({ ...prev, photoURL: url }));
            toast.success("Photo uploaded! Save profile to finalize.");
        } catch (error) {
            toast.error("Failed to upload photo.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (!token) throw new Error("Not authenticated");

            const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Failed to update profile");

            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Error updating profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
                            <AvatarImage src={formData.photoURL} />
                            <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                                {formData.displayName?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <Label 
                            htmlFor="photo-upload" 
                            className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform"
                        >
                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                            <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={isUploading} />
                        </Label>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-primary">{formData.displayName || 'User'}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <Shield className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium uppercase tracking-wider">Proponent Access</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 px-6">Discard</Button>
                    <Button 
                        className="h-11 px-6 bg-primary" 
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-xl">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your public profile and contact information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="displayName">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                            id="displayName" 
                                            value={formData.displayName} 
                                            onChange={handleInputChange}
                                            className="pl-10 h-11" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" value={user?.email || authUser?.email || ''} disabled className="pl-10 h-11 bg-muted/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input 
                                            id="phoneNumber" 
                                            value={formData.phoneNumber} 
                                            onChange={handleInputChange}
                                            className="pl-10 h-11" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Professional Summary</Label>
                                <Textarea 
                                    id="bio" 
                                    rows={4} 
                                    value={formData.bio} 
                                    onChange={handleInputChange}
                                    placeholder="Tell us about your professional background..." 
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="border-none shadow-md bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-lg">Account Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-background rounded-xl border shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                        <Shield className="h-5 w-5" />
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-bold">2FA Enabled</p>
                                        <p className="text-muted-foreground">Extra security layer active</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full text-xs h-10">Change Password</Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md border-red-100 bg-red-50/10">
                        <CardHeader>
                            <CardTitle className="text-lg text-red-600">Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-[10px] text-muted-foreground">Once you delete your account, there is no going back. Please be certain.</p>
                            <Button variant="destructive" className="w-full text-xs h-10 gap-2">
                                <Trash2 className="h-4 w-4" /> Deactivate Account
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
