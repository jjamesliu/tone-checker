"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import {useState, useEffect} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

import { MoveLeft } from 'lucide-react';
import React from "react";

import {useAuth} from '@/app/context/AuthContext';

export default function Login() {
    const {login} = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [apiResponse, setApiResponse] = useState('');

    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        // console.log("Form Submit Button Clicked: ", formData); //debugging
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setApiResponse(data.message);
            
            // console.log(data.message); // for debugging
            if (data.message.includes("successful")) {
                login({name: data.name, email:data.email});
                setFormData({
                    email: '',
                    password: ''
                });
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            }

        } catch (error) {
            console.error("Error occuring in login page when fetching api/login: ", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}))
    }

    // debugging useEffect to see formData changes
    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    return (
        <div className='min-h-screen flex items-center justify-center px-8'>
            <Card className="w-full max-w-[450px] ">
            <div className='w-fit ml-4 mb-3 text-[13px] text-black hover:text-gray-500 transition-all duration-300 cursor-pointer'>
                <Link href='/' className='flex items-center gap-1'>
                    <MoveLeft size={16}/>
                    <span>Back To Home</span>
                </Link>
            </div>
            <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                Enter your credentials to access your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="login-form" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                        href="#"
                        className="ml-auto inline-block text-sm text-[#848484] font-md hover:underline hover:text-black  transition-all duration-300 "
                        >
                        Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <button type="submit" form="login-form" className="w-full bg-black text-white hover:opacity-80 transition-all duration-300 rounded-xl py-1.5 cursor-pointer">
                Sign in
                </button>
                {apiResponse && (
                    <span className={`text-center text-sm mt-2 ${apiResponse.includes("successful") ? 'text-green-600': 'text-red-600'}`}>
                        {apiResponse} 
                    </span>
                )}
                <div className="w-full"> 
                    <div className="flex items-center ">
                        <div className="flex-grow h-px bg-gray-400"></div>
                        <span className="px-3 text-gray-600 text-sm">or</span>
                        <div className="flex-grow h-px bg-gray-400"></div>
                    </div>
                </div>
                <Link href='/signup' className="w-full border border-gray-300 rounded-xl py-[4px] cursor-pointer hover:bg-black/5 transition-all duration-300">
                Don&apos;t have an account? Sign up
                </Link>
                <div className='my-2'>
                    <button className='text-[#848484] font-md text-sm hover:underline hover:text-black transition-all duration-300  cursor-pointer'>Forgot Your Pasword?</button>
                </div>
            </CardFooter>
            </Card>
        </div>
    )
}