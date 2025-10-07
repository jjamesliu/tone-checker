import {useAuth} from '@/app/context/AuthContext';
import Link from 'next/link';


export default function Login() {
    const {user, logout } = useAuth();

    if (user) {
        return (
        <div>
            <button className='button-login' onClick={logout}>
                {user.name}
            </button>
        </div>
        )
    }

    return (
        <div>
            <Link href='/login'>
                <button className='button-login'>
                    Login
                </button>
            </Link>
        </div>
    )
}