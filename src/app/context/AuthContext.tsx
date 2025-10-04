"use client"
import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {UserDisplay} from '@/app/lib/user';
import {useRouter} from 'next/navigation';

interface AuthContextType {
    user: UserDisplay | null;
    login: (userData : {name: string, email: string}) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<UserDisplay | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const login = (userData: {name: string, email: string}) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
        router.push('/');
    }

    return (
        <AuthContext.Provider value={{user, login, logout, isLoading}}>
         {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}