import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);

    // Try to fetch the existing user data
    const response = await fetch(`/api/db/users?email=${result.user.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('User data:', data);
    return data;

  } catch (error) {
    console.error("Error with Google sign-in:", error);
  }
}

export async function signUpWithGoogle(isLandlord : boolean) {

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

    // Check if the user already exists in the database
    const response = await fetch(`/api/db/users?email=${user.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User already exists:", data);
      return data; // User exists, return their data
    }

    // If user does not exist, create a new user in the database
    const createUserResponse = await fetch(`/api/db/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: user.displayName?.split(' ')[0] || '',
        last_name: user.displayName?.split(' ')[1] || '',
        email: user.email,
        is_landlord: isLandlord,
        uid: user.uid,
      }),
    });

    if (!createUserResponse.ok) {
      throw new Error(`Error creating user: ${createUserResponse.status} - ${createUserResponse.statusText}`);
    }

    const newUser = await createUserResponse.json();
    console.log("New user created:", newUser);
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
