import { NextRequest, NextResponse } from 'next/server';
import Environmental from '../../../../models/environmental';
import connectionToDatabase from '../../../../lib/mongoose';

export async function POST(request: NextRequest) {
    try {
        await connectionToDatabase();

        const data = await request.json();

        // Validate required fields
        const { project_title, proponent, sector, category, location, description } = data;

        if (!project_title || !proponent || !sector || !category || !location || !description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newEnvironmental = new Environmental({
            project_title,
            proponent,
            sector,
            category,
            location,
            description,
            environmental_impact: data.environmental_impact || '',
            mitigation_measures: data.mitigation_measures || '',
            status: 'pending'
        });

        await newEnvironmental.save();

        console.log("💾 Environmental application saved:", newEnvironmental._id);

        return NextResponse.json(
            { message: "Environmental application submitted successfully", id: newEnvironmental._id },
            { status: 201 }
        );

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("💥 POST /api/environmental ERROR:", errorMessage);
        console.error("Full error:", error);
        return NextResponse.json({
            error: "Failed to submit environmental application",
            details: errorMessage
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectionToDatabase();

        const applications = await Environmental.find().sort({ submittedAt: -1 });

        return NextResponse.json(applications);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("💥 GET /api/environmental ERROR:", errorMessage);
        return NextResponse.json({
            error: "Failed to fetch environmental applications",
            details: errorMessage
        }, { status: 500 });
    }
}