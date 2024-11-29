
import { db } from "@/firebase/config";
import { setDoc, doc, collection, addDoc, 
  query, getDoc, onSnapshot, orderBy, limit, 
  DocumentReference, updateDoc, Timestamp
} from "firebase/firestore";
import { Chat } from "@/types";



export async function createChat(userOneId: string | undefined, userTwoId: string | undefined, text: string) {
  
  try {
    if (!userOneId || !userTwoId) {
      console.log("User IDs are required");
      return
    }
  
    if (userOneId === userTwoId) {
      throw new Error("Users cannot be the same");
    }
  
    //check if users exist first
    const userOneDoc = await getDoc(doc(db, "users", userOneId));
    const userTwoDoc = await getDoc(doc(db, "users", userTwoId));
  
    if (!userOneDoc.exists() || !userTwoDoc.exists()) {
      throw new Error("User does not exist");
    }
  
    //after verifying users exist, make sure the chat does not already exist
    const chatRef = doc(db, "chats", userOneId + userTwoId)
    const chatDoc = await getDoc(chatRef);
    if (chatDoc.exists()) {
      throw new Error("Chat already exists");
    }
    
  
    //now grab first and last name from userOne and userTwo
    const userOneName = userOneDoc.data().firstName + ' ' + userOneDoc.data().lastName;
    const userTwoName = userTwoDoc.data().firstName + ' ' + userTwoDoc.data().lastName;
  
  
  
    //then if chat does not exist, create it in the chats collection first
    await setDoc(chatRef, {
      chatId: chatRef,
      createdAt: Timestamp.now(),
      lastMessage: text,
      lastTimestamp: Timestamp.now(),
      members: [userOneName, userTwoName],
      title: userTwoName,
      type: "direct",
    })
    
    //also create a messages subcollection for the chat
    const messagesCollection = collection(chatRef, "messages");
    await addDoc(messagesCollection, {
      senderId: userOneId,
      text: text,
      timestamp: Timestamp.now(),
    });
  
    //need add the chat doc reference to users/userChats
    const userOneChats = collection(db, "users", userOneId, "userChats");
    const userTwoChats= collection(db, "users", userTwoId, "userChats");
  
    
    //now create a ref to the chat in the userChats collection and this will trigger the snapshot listener
    await addDoc(userOneChats, {
      chatId: chatRef,
    });
    await addDoc(userTwoChats, {
      chatId: chatRef,
    })

  } catch (error) {
    //TODO: delete chat if i created it
    console.error("Error creating chat:", error);
  }
  console.log("chat created!");
  
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

    const currTimestamp = Timestamp.now();

    await updateDoc(chatId, {
      lastTimestamp: currTimestamp
    })
   
  
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
