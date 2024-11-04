'use client'
import UserManagerContainer from "@/containers/user-page/UserManagerContainer"
import { useAuth } from "@contexts/AuthContext";
import { redirect } from 'next/navigation';

export default function Dashbard() {
    const { user } = useAuth();
    if (!user) {
        redirect('/user/login')
    }

    return (
        <UserManagerContainer node='dashboard'>
            <div id="content" className="w-4/5 h-full flex flex-col items-start justify-start overflow-y-auto p-5">
                <h1 className="text-3xl m-30">{`Welcome, `+ user.displayName} </h1>
            
            </div>

        </UserManagerContainer>
        

    )
}