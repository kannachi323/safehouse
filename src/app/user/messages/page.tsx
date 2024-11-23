'use client';

import UserManagerContainer from "@/containers/user-page/UserManagerContainer";

export default function MessagesPage() {
  return (
    <UserManagerContainer node="messages">
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold p-6">Messages</h1>
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg mx-6">
          <p className="text-gray-500 text-lg">
            No messages yet. Check back later!
          </p>
        </div>
      </div>
    </UserManagerContainer>
  );
}
