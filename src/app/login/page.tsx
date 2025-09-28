import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import Link from 'next/link';

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

import { MoveLeft } from 'lucide-react';

export default function Login() {
    return (
        <div className='min-h-screen flex items-center justify-center px-8'>
            <Card className="w-full max-w-[450px] ">
            <div className='ml-4 mb-3 text-[13px] text-black hover:text-gray-500 transition-all duration-300 cursor-pointer'>
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
                <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
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
                    <Input id="password" type="password" placeholder="Enter your password" required />
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <button className="w-full bg-black text-white hover:opacity-80 transition-all duration-300 rounded-xl py-1.5 cursor-pointer">
                Sign in
                </button>
                <div className="w-full"> 
                    <div className="flex items-center ">
                        <div className="flex-grow h-px bg-gray-400"></div>
                        <span className="px-3 text-gray-600 text-sm">or</span>
                        <div className="flex-grow h-px bg-gray-400"></div>
                    </div>
                </div>
                <Link href='/signup' className="w-full border border-gray-300 rounded-xl py-[4px] cursor-pointer hover:bg-black/5 transition-all duration-300">
                Don't have an account? Sign up
                </Link>
                <div className='my-2'>
                    <button className='text-[#848484] font-md text-sm hover:underline hover:text-black transition-all duration-300  cursor-pointer'>Forgot Your Pasword?</button>
                </div>
            </CardFooter>
            </Card>
        </div>
    )
}