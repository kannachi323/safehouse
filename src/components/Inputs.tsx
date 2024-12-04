import React, { useState } from 'react';
import { sendMessage } from '@/firebase/db';
import { DocumentReference } from "firebase/firestore";

interface Props {
  className?: string;
  selectedChatIndex: number;
  setSelectedChatIndex: React.Dispatch<React.SetStateAction<number | null>>;
  chatId: DocumentReference | null;
  senderId: string;
}

export function ChatInput({ className, setSelectedChatIndex, selectedChatIndex, chatId, senderId}: Props) {
  
  const [textareaValues, setTextareaValues] = useState<{ [key: string]: string }>({});

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    // Update the textarea value for the specific chat
    setTextareaValues((prevValues) => ({
      ...prevValues,
      [selectedChatIndex]: value, // Use chatId as key to store input value
    }));
  };


  async function handleSend() {
    console.log(chatId);

    const message = textareaValues[selectedChatIndex] || '';
    if (message) {
      console.log(`Message sent for chat ${selectedChatIndex}:`, message);

      setTextareaValues((prevValues) => ({
        ...prevValues,
        [selectedChatIndex]: '', // Clear the input for the current chat
      }));

      const status = await sendMessage(chatId ,senderId, message);

      if (status != null) {
        console.log("Message sent successfully:", status);
        setSelectedChatIndex(0);
      }

    }
  };

  return (
    <div className={`${className}`}>
      {/* Step 4: Bind the value and onChange to the textarea for the specific chat */}
      <textarea
        className="resize-none rounded-md w-full h-10 p-2 outline-none"
        placeholder="Type your message..."
        value={textareaValues[selectedChatIndex] || ''} // Bind textarea value to chat-specific state
        onChange={handleTextareaChange} // Update textarea value on change
      />
      <button
        className="bg-[#ffc00c] text-[#023c6c] h-10 px-6 py-2 rounded-md hover:bg-[#e5a700]"
        onClick={handleSend} // Send message for the current chat
      >
        Send
      </button>
    </div>
  );
}

