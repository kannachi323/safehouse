import { app } from "@/auth/config"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut
} from "firebase/auth";

//DOCUMENTATION: https://firebase.google.com/docs/auth/web/manage-users#web


export async function signInWithGoogle() {
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);

      // Extract user details
      const { displayName, email } = result.user;
      const [first_name, last_name] = displayName ? displayName.split(" ") : ["", ""];

      // Send user data to API route
      await fetch("/api/db/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ first_name, last_name, email, is_landlord: false })
      });

      return result;
      // Handle the user info as needed, e.g., save it to the database or update state
  } catch (error) {
      console.error("Error with Google sign-in:", error);
  }
}

export async function userSignOut() {
  const auth = getAuth(app);
  try {
    const result = await signOut(auth);
    console.log(result);
    
  } catch (error) {
    console.error("Error trying to log out");
  }
}
