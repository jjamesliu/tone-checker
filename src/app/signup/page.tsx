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
        <div className='relative min-h-screen w-full flex items-center justify-center rounded-xl'>
            <div className='max-w-[450px] w-full flex flex-col bg-[#e0e0e0] rounded-xl border-b border-black'>
                <Card className="w-full border-0">
                <div className='ml-4 text-[13px] text-black hover:text-gray-500 transition-all duration-300 cursor-pointer'>
                    <Link href='/' className='flex items-center gap-1'>
                        <MoveLeft size={16}/>
                        <span>Back To Home</span>
                    </Link>
                </div>
                <CardHeader>
                    <CardTitle>Sign Up for Tone Analyzer</CardTitle>
                    <CardDescription>
                    Create An Account to Continue
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
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" required />
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input id="password" type="password" placeholder="Confirm your Password" required />
                        </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <button className="w-full bg-black text-white hover:opacity-80 transition-all duration-300 rounded-xl py-1.5 cursor-pointer">
                    Sign up
                    </button>
                </CardFooter>
                </Card>
                <div className="flex justify-center py-4 rounded-b-xl items-center gap-1 w-full text-sm text-[#686868]">
                    <span className=''>Already have an account?</span>
                    <Link href='/login' className="underline text-black hover:text-gray-500 transition-all duration-300 cursor-pointer">
                      Login
                    </Link>
                </div>
            </div>

        </div>
    )
}