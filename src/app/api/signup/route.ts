import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import clientPromise from "@/app/lib/mongodb";
import { User } from "@/app/lib/user";

export async function POST(request: Request) {
    try {
        const {name, email, password, confirm_password} = await request.json();

    if (!name || !email || !password || !confirm_password) {
        return NextResponse.json({ message: "All fields are required." }, {status: 400});
    }

    if (password !== confirm_password) {
        return NextResponse.json({ message: "Passwords do not match." }, {status: 400});
    }

    if (password.length < 6) {
        return NextResponse.json({ message: "Password must be at least 6 characters long." }, {status: 400});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ message: "Invalid email format." }, {status: 400});
    }

    //after all checks are completed, connect to db
    const client = await clientPromise;
    const db = client.db("tone-check");

    //check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: "Email already in use. Try logging in." }, {status: 400});
    }

    //finally hash the password and store the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: Omit<User,'_id'>  = {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    //confirm creation
    const result = await db.collection<User>("users").insertOne(newUser);
    if (!result.acknowledged) {
        return NextResponse.json({ message: "Error creating user MongoDB issue. Please try again." }, {status: 500});
    } else {
        return NextResponse.json(
            { 
            message: "User created successfully.",
            userId: result.insertedId, 
            email: newUser.email,
            name: newUser.name 
            },

            {status: 201}
        );
    }


    } catch (error) {
        console.error("There was an error calling the signup route", error);
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500}
    );
    }
}