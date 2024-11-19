"use client";
import { signInWithGoogle } from '@/firebase/auth';
import { GoogleButton } from '@/components/Buttons/Buttons';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import ChooseUser from '@/containers/auth-page/ChooseUserContainer';

export default function Page() {
    const [showPage, setShowPage] = useState<number>(0);
    const [isLandlord, setIsLandlord] = useState<boolean>(false);

    return (
        <div className="h-screen flex flex-col items-center justify-center relative">
            
            {showPage > 0 && (
                <div className="absolute top-4 left-4 p-2 hover:text-gray-500">
                    <IoMdArrowRoundBack 
                        className="text-6xl cursor-pointer" 
                        onClick={() => setShowPage(showPage - 1)} 
                    />
                </div>
            )}

            {/* Content */}
            {showPage === 0 && <ChooseUser showPage={showPage} setShowPage={setShowPage} setIsLandlord={setIsLandlord} />}
            {showPage === 1 && <SignUp isLandlord={isLandlord}/>}
        </div>
    );
}



function SignUp({isLandlord} : {isLandlord : boolean}) {
    const router = useRouter();

    async function handleAuth() {
        const result = await signInWithGoogle(isLandlord);
        if (result) {
            router.push('/listings/default')
        }
    }
    return (
        <>
            <div className="p-8 rounded-lg shadow-2xl max-w-md w-full border-2 flex flex-col">
                

                <h2 className="text-3xl font-bold mb-6 text-center">Create an account</h2>
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
                        >Sign Up</button>
                    </div>
                    
                    <div className="flex items-center w-full my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                            
                </form>
                <div className="flex justify-center items-center w-1/2 my-4 self-center">
                    <GoogleButton onClick={handleAuth}/>
                </div>
                
            </div> 
        
        </>
        
    );
}


