import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { User } from "@/types";

export async function addUserToPostgres(user : User) {
    try {
      const createUserResponse = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
        }),
      });

      const newUser = await createUserResponse.json();

      return newUser;

    } catch (error) {
      console.error("Error adding user to database:", error);
    }
  
}

export async function loginWithEmailAndPassword(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error with email sign-in:", error);
  }
    
}

export async function registerUserWithEmailAndPassword(email: string, password: string, isLandlord : boolean) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Extract user details
    const user = result.user;
    console.log(user);
    if (!user) {
      console.error("User not found after Google sign-up");
      return;
    }
    
    const userToCreate : User = {
      uid: user.uid,
      first_name: user.displayName?.split(' ')[0] || '',
      last_name: user.displayName?.split(' ')[1] || '',
      email: user.email || '',
      is_landlord: isLandlord,
    };

    await addUserToPostgres(userToCreate);


  } catch (error) {
    throw new Error(`Error with email sign-up:", ${error}`);
  }
} 

export async function signInWithGoogle(isLandlord : boolean) {

  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed up:", result.user);

    // Extract user details
    const user = result.user;
    if (!user) {
      console.error("User not found after Google sign-up");
      return;
    }
    
    const userToCreate : User = {
      uid: user.uid,
      first_name: user.displayName?.split(' ')[0] || '',
      last_name: user.displayName?.split(' ')[1] || '',
      email: user.email || '',
      is_landlord: isLandlord,
    };

    await addUserToPostgres(userToCreate);

  } catch (error) {
    console.error("Error with Google sign-up:", error);
  }
}

export async function userSignOut() {
  try {
    await signOut(auth);
    
    
  } catch (error) {
    throw new Error(`Error with email sign-up:", ${error}`);
  }
}
