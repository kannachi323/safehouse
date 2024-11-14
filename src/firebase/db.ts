import { db } from "@/firebase/config";
import { setDoc, doc } from "firebase/firestore";

function createChatRoom() {

}

export async function getChatRoom() {
    await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      }, { merge: true });
    
}