"use client";
import { useEffect } from 'react';
import { GoogleButton } from '@/components/Buttons/Buttons';
import { signInWithGoogle } from '@/auth/provider';
import { useRouter } from 'next/navigation';
import { useAuth } from '@contexts/AuthContext'

export default async function SignIn() {
    const router = useRouter();
    
    const { user } = useAuth();
    
    if (user) {
        router.push('/listings/default')
    }
   

    async function handleSignIn() {
        const result = await signInWithGoogle();
        if (result) {
            router.push('/listings/default')
        }
    }

    
    
    return (
        <div className="h-[90vh] flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-2xl max-w-md w-full border-2 flex flex-col"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
                <form className="flex flex-col space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                    
                            placeholder="Enter password"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                    </div>
                    <div className="flex justify-center items-center w-1/2 rounded-full self-center">
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{backgroundColor: 'var(--foreground)'}}
                        >Sign In</button>
                    </div>
                    
                    <div className="flex items-center w-full my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                            
                </form>
                <div className="flex justify-center items-center w-1/2 my-4 self-center">
                    <GoogleButton onClick={handleSignIn}/>
                </div>
                
            </div>
        </div>
    );
}

