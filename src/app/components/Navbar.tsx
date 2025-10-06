import LoginButton from '@/app/components/LoginButton';
import { Send } from 'lucide-react';

export default function Navbar() {
    return (
    <>  
        
        <div className='fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4 glass-effect'>
            <div className='flex items-center gap-2 p-2 px-3 border rounded-2xl border-gray-600'> 
                <Send size={16}/>
                <h1 className='font-bold'>Tone Analyzer</h1>
            </div>
            <div className='flex gap-6 absolute left-1/2 -translate-x-1/2 text-sm'>
                <button>
                    Import Email Template
                </button>
                <button>
                    History
                </button>
            </div>

            <LoginButton/>
        </div>
    </>
    )
}