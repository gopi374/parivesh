import mongoose from "mongoose";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/mongoose";

export async function POST(request: Request) {
    try {
        console.log("🔄 API /users POST received");
        await connectionToDatabase();
        const data = await request.json();
        console.log("📋 Form data:", data);
        
        // Validate required fields
        const required = ['project_title', 'Proposal_name', 'product_location', 'product_description', 'product_category'];
        const missing = required.filter(field => !data[field]);
        if (missing.length) {
            return NextResponse.json({ error: `Missing fields: ${missing.join(', ')}` }, { status: 400 });
        }
        
        const newUser = new User(data);
        await newUser.save();
        console.log("💾 User SAVED:", newUser._id);
        return NextResponse.json({ message: "User created successfully", id: newUser._id }, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("💥 POST /api/users ERROR:", errorMessage);
        console.error("Full error:", error);
        return NextResponse.json({ 
            error: "Failed to create user", 
            details: errorMessage 
        }, { status: 500 });
    }
}
