import { useState } from 'react';

export default function Login() {
    const [loginStatus, setLoginStatus] = useState(false);
    return (
        <div>
            <button className='button-login'>
                {loginStatus ? "Logout" : "Login"}
            </button>
        </div>
    )
}