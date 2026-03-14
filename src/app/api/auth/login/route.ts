import { NextRequest, NextResponse } from 'next/server';
import getParivanAdminModel from '@/models/parivanAdmin';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        const ParivanAdmin = await getParivanAdminModel();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Find user by username in admin database
        const user = await ParivanAdmin.findOne({ username, isActive: true });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Return user data (excluding password)
        const userData = {
            id: user._id,
            username: user.username,
            role: user.role,
            lastLogin: user.lastLogin
        };

        return NextResponse.json({
            message: 'Login successful',
            user: userData
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("💥 POST /api/auth/login ERROR:", errorMessage);
        return NextResponse.json({
            error: "Login failed",
            details: errorMessage
        }, { status: 500 });
    }
}