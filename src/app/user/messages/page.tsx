"use client";
import { useEffect, useState, useRef } from "react";
import { listenToUserChatsAndMessages } from '@/firebase/db';
import { Chat } from '@/types';
import { ChatInput } from "@/components/Inputs";
import UserManagerContainer from "@/containers/user-page/UserManagerContainer";
import { useAuth } from "@/contexts/AuthContext";
import { Unsubscribe } from "firebase/auth";


export default function ChatsPage() {
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>();
  const [chats, setChats] = useState<Chat[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
 
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.uid) return
    // Listen to changes in the user's `userChats` subcollection (detect new chats)
    
  
    const { unsubscribeUserChats, messageListeners } = listenToUserChatsAndMessages(user?.uid, setChats);
    
    return () => {
      unsubscribeUserChats();
      messageListeners.forEach((unsubscribeMessage : Unsubscribe) => unsubscribeMessage());
    }
  }, [user])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [activeChat?.messages, activeChat]);

  


  return (
    <UserManagerContainer node="messages">
      <div className="flex flex-row h-full w-4/5">
        <div
          id="chat-select"
          className="w-1/3 bg-[#f5f5f5] p-4 border-r-2 border-gray-300 overflow-y-scroll"
        >
          <h3 className="text-lg font-bold mb-4 text-gray-800">Chats</h3>
          <ul className="list-none space-y-2">
            {chats?.map((chat, id) => (
              <li
                key={id}
                onClick={() => {
                  setActiveChat(chat);
                  setSelectedChatIndex(id)
                }}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedChatIndex === id
                    ? "bg-[#fdc100] text-[#023c6c]"
                    : "bg-white text-[#023c6c] hover:bg-gray-100"
                } shadow-sm border border-gray-200`}
              >
                <div id="chat-user-profile" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold">
                    {chat && chat.title.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{chat && chat.title}</p>
                    <p className="text-sm text-gray-500 truncate">{chat && chat.messages && chat.messages[chat.messages.length - 1]?.text || ''}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {activeChat && selectedChatIndex !== null ? (
          <div id="chat-content" className="flex flex-col w-2/3 h-full">
            
            <h2 className="flex flex-row items-center text-xl font-bold text-gray-800 border-b-2 border-b-gray-400 p-6 ">
              {activeChat ? activeChat.title : ''}
            </h2>

            {/* Messages Area */}
            <div className="flex flex-col h-[90%] overflow-y-scroll px-5 pt-5 scroll-bott" ref={messagesEndRef}>
              {activeChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 mb-5 rounded-lg max-w-[75%] shadow-md ${
                    message.senderId === user?.uid
                      ? "bg-[#023c6c] text-white self-end"
                      : "bg-gray-300 text-black self-start"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              
            </div>

          

            {/* Input Section */}
            <ChatInput className="flex items-center gap-4 h-[10%] p-6 border-t-2 border-2-slate-200"
              setSelectedChatIndex={setSelectedChatIndex} selectedChatIndex={selectedChatIndex} 
              chatId={chats && chats[selectedChatIndex].chatId || null} senderId={user?.uid || ''} />
              
          </div>
        ) : (
          <div id="chat-content" className="flex w-2/3 h-full justify-center items-center">
            No messages to display...
          </div>
        )}
      </div>
    </UserManagerContainer>
   

    
  );
};

