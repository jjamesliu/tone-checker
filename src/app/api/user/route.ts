import {NextResponse} from "next/server";
import clientPromise from '@/app/lib/mongodb';
import {User} from '@/app/lib/user';


export async function GET(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("tone-check");

        // const users: User[] = await db.collection("users").find({}).toArray();
    } catch (error) {
        console.error("There was an error getting the user", error)
    }
}
