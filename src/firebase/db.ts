
import { db } from "@/firebase/config";
import { setDoc, doc, collection, serverTimestamp, addDoc, 
  query, where, getDocs, getDoc, onSnapshot, orderBy, limit, 
  DocumentReference, updateDoc, Timestamp
} from "firebase/firestore";
import { Chat } from "@/types";


export async function createChat(member1: string, member2: string) {
    const member1ChatsRef = collection(db, "users", member1, "userChats");
    const member1ChatQuery = query(member1ChatsRef, where("participants", "array-contains", member2));
  
    const querySnapshot = await getDocs(member1ChatQuery);
  
   
    if (!querySnapshot.empty) {
      const existingChatId = querySnapshot.docs[0].id;
      console.log("Chat already exists with ID:", existingChatId);
      return existingChatId;
    }
  
    
    const chatRef = doc(collection(db, "chats"));
    const chatId = chatRef.id;
  
    await setDoc(chatRef, {
      title: "General Chat",
      createdAt: serverTimestamp(),
      members: [member1, member2],
      lastMessage: "Welcome to the chat!",
      type: "group"
    });
  

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

export async function sendMessage(
  chatId: DocumentReference | null, 
  senderId: string, 
  text: string
) {
  if (!chatId || !senderId || !text) {
    throw new Error("Missing required parameters (chatId, senderId, or text).");
  }

  try {
    const messagesRef = collection(chatId, "messages"); // Access the 'messages' subcollection

    const currTimestamp = Timestamp.fromDate(new Date());

    const updates = await updateDoc(chatId, {
      lastTimestamp: currTimestamp
    })

    console.log(updates);
  
    const messageRef = await addDoc(messagesRef, {
      senderId: senderId,
      text: text,
      timestamp: currTimestamp
    });


    

    console.log("Message added to chat:", chatId.path); // Logging the chat path for better debugging
    
    // Returning the DocumentReference of the added message
    return messageRef;
  } catch (error) {
    console.error("Error adding message to chat:", error);
    throw error;
  }
}


export function listenToUserChatsAndMessages(
  uid: string | undefined,
  setChats: React.Dispatch<React.SetStateAction<Chat[] | null>>,

) {
  if (!uid) {
    throw new Error("User ID is required.");
  }

  const userChatsRef = collection(db, "users", uid, "userChats");
  const messageListeners: (() => void)[] = []; // store all the listeners for messages

  // Listen to real-time changes in the user's `userChats` subcollection
  const unsubscribeUserChats = onSnapshot(userChatsRef, async (snapshot) => {
    // Iterate through document changes (added, modified, removed)
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added" || change.type === "modified") {
        const chatDocRef = change.doc.data().chatId;
        const chatDoc = await getDoc(chatDocRef); // Try to find the chat doc

        if (chatDoc.exists()) {
          const chatData = chatDoc.data() as Chat;
          const messagesRef = collection(chatDocRef, 'messages');
          const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));

          // This onSnapshot function is a listener and will be called when a new message is added
          const unsubscribeMessage = onSnapshot(messagesQuery, (messageSnapshot) => {
            const updatedMessages = messageSnapshot.docs.map((doc) => ({
              text: doc.data().text,
              senderId: doc.data().senderId,
              timestamp: doc.data().timestamp
            }));
            
            
            chatData.messages = updatedMessages.reverse();
            chatData.lastTimestamp = messageSnapshot.docs[messageSnapshot.docs.length - 1]?.data().timestamp;
          
            setChats((prevChats) => {
              if (!prevChats) return [chatData]; // If no previous chats, return a new array with chatData
          
              // Remove any chat with the same chatId to update the existing chat
              const updatedChats = prevChats.filter((chat) => chat.chatId !== chatData.chatId);
          
              // Append the new chatData and sort by lastTimestamp
              return [...updatedChats, chatData].sort((a, b) => b.lastTimestamp.toMillis() - a.lastTimestamp.toMillis());
              
            });
            
          });

          messageListeners.push(unsubscribeMessage);
          

        } else {
          console.warn(`Chat with id ${chatDocRef.id} not found`);
        }
      }

      if (change.type === "removed") {
        // Handle document removal if necessary (optional)
        console.log("Removed chat: ", change.doc.data());
      }
      
      
    });

 
   
   
  });

  

  

  // Return the cleanup function that will unsubscribe from the userChats listener and message listeners
  return { unsubscribeUserChats, messageListeners };
}
