"use client";
import React, { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        schoool: '',
    });
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-400">
            <div className="p-8 rounded-lg shadow-lg max-w-md w-full"
            style={{backgroundColor: 'var(--background)', color: 'var(--foreground)'}}>
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
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
                        >Sign Up</button>
                    </div>
                    <div className="flex justify-center mt-4">

                    </div>
                </form>
            </div>
        </div>
    );
}