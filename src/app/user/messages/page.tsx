"use client";
import React, { useState } from 'react';
import './messages.css';
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";
import { createChat } from '@/firebase/db';

interface Conversation {
  id: number;
  name: string;
  messages: string[];
}

const test: Conversation[] = [
  { id: 1, name: 'Bob', messages: ['Hello'] },
  { id: 2, name: 'Dude', messages: ['Hi'] },
];

function handleSend() {
  const chatRefId = createChat("mattdev727@gmail.com", "safehousegroup727@gmail.com");
  console.log(chatRefId);
}

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(test);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  

  return (
    <div className="messages-page">
      <Link className="hover:text-slate-400" href="/user/properties">
        <IoMdArrowRoundBack className="text-5xl" />
      </Link>
      <div className="sidebar">
        <h2 className="sidebar-header">Conversations</h2>
        <ul className="conversation-list">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''}`}
              onClick={() => setActiveConversation(conversation)}
            >
              {conversation.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="message-content">
        {activeConversation ? (
          <>
            <h2 className="conversation-header">{activeConversation.name}</h2>
            <div className="messages">
              {activeConversation.messages.map((message, index) => (
                <div key={index} className="message-bubble">
                  {message}
                </div>
              ))}
            </div>
            <div className="message-input-section">
              <input type="text" className="message-input" placeholder="Type a message..." />
              <button className="send-button" onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-conversation">Select a conversation to start chatting</div>
        )}
      </div>
    </div>
  );
};
export default MessagesPage;