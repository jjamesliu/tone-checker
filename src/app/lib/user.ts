import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    password: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserDisplay {
    email: string;
    name: string;
}