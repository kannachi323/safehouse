import { db } from './config';
import { 
  collection, 
  query, 
  orderBy, 
  addDoc, 
  onSnapshot,
  where,
  getDocs,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { auth } from './auth';

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Timestamp;
}

interface ChatPreview {
  userId: string;
  displayName: string;
  lastMessage: string;
  lastMessageTime: Timestamp;
  unreadCount: number;
}

// Send a new message
export const sendMessage = async (receiverId: string, content: string) => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('Must be logged in to send messages');

  await addDoc(collection(db, 'messages'), {
    senderId: currentUser.uid,
    receiverId,
    content,
    timestamp: serverTimestamp(),
  });
};

// Get recent chats for the current user
export const getRecentChats = (onChatsUpdate: (chats: ChatPreview[]) => void) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return () => {};

  // Create a query for messages where current user is either sender or receiver
  const q = query(
    collection(db, 'messages'),
    where('participants', 'array-contains', currentUser.uid),
    orderBy('timestamp', 'desc')
  );

  // Set up real-time listener
  return onSnapshot(q, async (snapshot) => {
    const chatPreviews = new Map<string, ChatPreview>();
    
    for (const doc of snapshot.docs) {
      const message = doc.data() as Message;
      const otherUserId = message.senderId === currentUser.uid 
        ? message.receiverId 
        : message.senderId;

      if (!chatPreviews.has(otherUserId)) {
        // Get user details from your users collection
        const userDoc = await getDocs(
          query(collection(db, 'users'), where('uid', '==', otherUserId))
        );
        
        const userData = userDoc.docs[0]?.data();
        
        chatPreviews.set(otherUserId, {
          userId: otherUserId,
          displayName: userData?.displayName || 'Unknown User',
          lastMessage: message.content,
          lastMessageTime: message.timestamp,
          unreadCount: 0 // Implement unread count logic if needed
        });
      }
    }

    onChatsUpdate(Array.from(chatPreviews.values()));
  });
};

// Get messages for a specific chat
export const getChatMessages = (otherUserId: string, onMessagesUpdate: (messages: Message[]) => void) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return () => {};

  // Query messages between the two users
  const q = query(
    collection(db, 'messages'),
    where('participants', 'array-contains', [currentUser.uid, otherUserId]),
    orderBy('timestamp', 'asc')
  );

  // Set up real-time listener
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => doc.data() as Message);
    onMessagesUpdate(messages);
  });
};