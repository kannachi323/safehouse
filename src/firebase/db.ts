
import { db } from "@/firebase/config";
import { setDoc, doc, collection, serverTimestamp, addDoc, query, where, getDoc, getDocs } from "firebase/firestore";


export async function createChat(member1: string, member2: string) {
    // Step 1: Query member1's `userChats` for any chat with member2 as a participant
    const member1ChatsRef = collection(db, "users", member1, "userChats");
    const member1ChatQuery = query(member1ChatsRef, where("participants", "array-contains", member2));
  
    const querySnapshot = await getDocs(member1ChatQuery);
  
    // Step 2: If a chat already exists, return the existing chat ID
    if (!querySnapshot.empty) {
      const existingChatId = querySnapshot.docs[0].id;
      console.log("Chat already exists with ID:", existingChatId);
      return existingChatId;
    }
  
    // Step 3: Create a new chat document in `chats` collection
    const chatRef = doc(collection(db, "chats"));  // Automatically generate a unique chatId
    const chatId = chatRef.id;
  
    await setDoc(chatRef, {
      title: "General Chat",
      createdAt: serverTimestamp(),
      members: [member1, member2],
      lastMessage: "Welcome to the chat!",
      type: "group"
    });
  
    // Step 4: Add the new chat ID to each member's `userChats` subcollection with participant info
    const member1ChatRef = doc(db, "users", member1, "userChats", chatId);
    const member2ChatRef = doc(db, "users", member2, "userChats", chatId);
  
    const userChatData = {
      chatId: chatId,
      participants: [member1, member2],
      lastMessage: "Welcome to the chat!",
      type: "group"
    };
  
    await setDoc(member1ChatRef, userChatData);
    await setDoc(member2ChatRef, userChatData);
  
    console.log("New chat created with ID:", chatId);
    return chatId;
}

async function addMessageToChat(chatId : string, senderId : string, text : string) {
// Reference the specific chat's messages subcollection
const messagesRef = collection(db, "chats", chatId, "messages");

// Add a new message document with sender, text, and timestamp
await addDoc(messagesRef, {
    senderId: senderId,
    text: text,
    timestamp: serverTimestamp(),
    readBy: [], // Initialize with an empty array for read receipts if needed
    messageType: "text"
});

console.log("Message added to chat:", chatId);
}

export async function getChat() {

}

