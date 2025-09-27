// /app/api/test-connection/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    
    // Ping the database to test connection
    await client.db("admin").command({ ping: 1 });
    
    return NextResponse.json({ 
      message: "Successfully connected to MongoDB!",
      status: "success" 
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    return NextResponse.json(
      { 
        message: "Failed to connect to MongoDB",
        error: error instanceof Error ? error.message : 'Unknown error',
        status: "error" 
      },
      { status: 500 }
    );
  }
}