import { config } from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import Environmental from '../models/environmental';

// Load environment variables first
config({ path: '.env.local' });

// If still not loaded, try reading the file directly
if (!process.env.MONGODB_URI) {
    try {
        const envContent = fs.readFileSync('.env.local', 'utf8');
        const lines = envContent.split('\n');
        for (const line of lines) {
            const [key, value] = line.split('=');
            if (key && value && key.trim() === 'MONGODB_URI') {
                process.env.MONGODB_URI = value.trim();
                break;
            }
        }
    } catch (error) {
        console.error('Error reading .env.local:', error);
    }
}

console.log('MONGODB_URI:', process.env.MONGODB_URI);

async function seedData() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Add sample environmental data
        const environmentalData = [
            {
                project_title: 'Sample Industrial Project',
                proponent: 'ABC Industries',
                sector: 'industrial',
                category: 'A',
                location: 'Mumbai, Maharashtra',
                description: 'Manufacturing facility for chemicals',
                environmental_impact: 'Potential air and water pollution',
                mitigation_measures: 'Installation of pollution control devices and waste treatment plant',
                status: 'pending'
            },
            {
                project_title: 'Infrastructure Development',
                proponent: 'XYZ Construction',
                sector: 'infrastructure',
                category: 'B',
                location: 'Delhi, India',
                description: 'Highway construction project',
                environmental_impact: 'Land use change and dust generation',
                mitigation_measures: 'Dust suppression, compensatory afforestation',
                status: 'under_review'
            },
            {
                project_title: 'Mining Operation',
                proponent: 'Mineral Corp',
                sector: 'mining',
                category: 'B1',
                location: 'Jharkhand',
                description: 'Coal mining project',
                environmental_impact: 'Soil erosion, water contamination, habitat destruction',
                mitigation_measures: 'Mine reclamation, water treatment, wildlife corridor creation',
                status: 'approved'
            }
        ];

        await Environmental.insertMany(environmentalData);
        console.log('Environmental data added successfully');

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

seedData();