"use client";
import React, { useState } from 'react';
import { signInWithGoogle } from '@/app/api/firebase/auth/[provider]/route';
import { GoogleButton } from '@/components/Buttons/Buttons';
export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        schoool: '',
    });

    
    
    return (
        <div className="h-[90vh] flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-2xl max-w-md w-full border-2 border-["
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
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
                            value={formData.password}
                            placeholder="Enter password"
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{backgroundColor: 'var(--foreground)'}}
                        >Sign In</button>
                    </div>
                    <div className="flex justify-center my-2 text-center">
                        or
                    </div>
                    <hr/>
                    <div className="flex justify-center mt-4">
                    
                    </div>
                </form>
                <GoogleButton onClick={signInWithGoogle} />
            </div>
        </div>
    );
}