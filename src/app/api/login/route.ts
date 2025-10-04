import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import clientPromise from "@/app/lib/mongodb";

export async function POST(request: Request) {
    try {
        const {email, password} = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, {status: 400});
        }

        //after all checks are completed, connect to db
        const client = await clientPromise;
        const db = client.db("tone-check");

        const user = await db.collection("users").findOne({ email: email.toLowerCase()});
        if (!user) {
            return NextResponse.json({message: "Please sign up for an account."}, {status: 401});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({message: "Invalid email or password. Please try again."}, {status: 401});
        }

        //if passess everything then
        return NextResponse.json(
            { 
            message: `Login successful! Welcome back, ${user.name}.`,
            name: user.name,
            email: user.email
            },
            { status: 200}
        );

        
    } catch (error) {
        console.error("There was an error with the login route: ", error);
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500});
    }
}