import { NextRequest, NextResponse } from 'next/server';
import AuthUser from '@/models/user';
import connectionToDatabase from '@/lib/mongoose';

export async function POST(request: NextRequest) {
    try {
        await connectionToDatabase();

        const { name, email, password, role } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await AuthUser.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Create new user
        const newUser = new AuthUser({
            name,
            email,
            password,
            role: role || 'proponent' // Default to proponent if no role specified
        });

        await newUser.save();

        // Return user data (excluding password)
        const userData = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
        };

        return NextResponse.json({
            message: 'User registered successfully',
            user: userData
        }, { status: 201 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("💥 POST /api/auth/register ERROR:", errorMessage);
        return NextResponse.json({
            error: "Registration failed",
            details: errorMessage
        }, { status: 500 });
    }
}