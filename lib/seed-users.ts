import { config } from 'dotenv';
import fs from 'fs';
import getParivanAdminModel from '../models/parivanAdmin';

// Load environment variables first
config({ path: '.env.local' });

// If still not loaded, try reading the file directly
if (!process.env.MONGODB_URI) {
    try {
        const envContent = fs.readFileSync('.env.local', 'utf8');
        const lines = envContent.split('\n');
        for (const line of lines) {
            const [key, value] = line.split('=') as [string, string];
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

async function seedUsers() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        // Connect to admin database and get model
        const ParivanAdmin = await getParivanAdminModel();

        // Create test users
        const testUsers = [
            {
                username: 'admin',
                password: 'admin123',
                role: 'admin'
            },
            {
                username: 'scrutiny',
                password: 'scrutiny123',
                role: 'scrutiny'
            },
            {
                username: 'mom',
                password: 'mom123',
                role: 'mom'
            },
            {
                username: 'proponent',
                password: 'proponent123',
                role: 'proponent'
            }
        ];

        for (const userData of testUsers) {
            const existingUser = await ParivanAdmin.findOne({ username: userData.username });
            if (!existingUser) {
                const user = new ParivanAdmin(userData);
                await user.save();
                console.log(`✅ Created user: ${userData.username} (${userData.role})`);
            } else {
                console.log(`⚠️  User already exists: ${userData.username}`);
            }
        }

        console.log('🎉 User seeding completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding users:', error);
        process.exit(1);
    }
}

seedUsers();