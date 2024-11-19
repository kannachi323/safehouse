import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { User } from "@/types";

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

    //build User interface objcet
    const userToCreate : User = {
      uid: user.uid,
      first_name: user.displayName?.split(' ')[0] || '',
      last_name: user.displayName?.split(' ')[1] || '',
      email: user.email || '',
      is_landlord: isLandlord,
    };

    // If user does not exist, create a new user in the database. this will also check for duplicates
    const createUserResponse = await fetch(`/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userToCreate,
      }),
    });

    if (!createUserResponse.ok) {
      throw new Error(`Error creating user: ${createUserResponse.status} - ${createUserResponse.statusText}`);
    }

    const newUser = await createUserResponse.json();
    console.log(newUser);
    return newUser;

  } catch (error) {
    console.error("Error with Google sign-up:", error);
  }
}

export async function userSignOut() {
  try {
    await signOut(auth);
    
    
  } catch (error) {
    console.error("Error trying to log out:", error);
  }
}
