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

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

import { MoveLeft } from 'lucide-react';

import {useState} from 'react';
import {useAuth} from '@/app/context/AuthContext';

export default function Login() {
    const {user, login} = useAuth();

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [apiResponse, setApiResponse] = useState('');

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData(prevState => ({...prevState, [id]: value}) );
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        // console.log("Form Data Submit Button Clicked: ", formData); //for debugging
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            login({name: data.name, email:data.email});
            // console.log("raw response data: ", data); //debugging

            if (data.message.includes("successfully")) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: ''
                });

                setTimeout(() => {
                    router.push('/');
                }, 1000);
            };

            setApiResponse(data.message);
        } catch (error) {
            console.error("Error submitting form: ", error);}
    }

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
                    <form id="signup-form" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" value={formData.password} required onChange={handleChange}/>
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <Input id="confirm_password" type="password" placeholder="Confirm your Password" value={formData.confirm_password} required onChange={handleChange}/>
                        </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <button type="submit" form="signup-form"
                    className="w-full bg-black text-white hover:opacity-80 transition-all duration-300 rounded-xl py-1.5 cursor-pointer">
                    Sign up
                    </button>
                    {apiResponse && <p className={`${apiResponse.includes("successfully") ? "text-green-600" : "text-red-600"} mt-3 text-center text-sm`}>
                        {apiResponse}
                    </p>}
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