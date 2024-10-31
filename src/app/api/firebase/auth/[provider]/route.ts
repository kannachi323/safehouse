import { app } from "@/app/api/firebase/config"
import { getAuth, signInWithRedirect, GoogleAuthProvider
} from "firebase/auth";
//DOCUMENTATION: https://firebase.google.com/docs/auth/web/manage-users#web

const auth = getAuth(app);


//TODOS: Implement functions below


//get currently signed in user



//register new users


//google provider

export async function signInWithGoogle() {
  try {
    const GoogleProvider = new GoogleAuthProvider();
    const result = await signInWithRedirect(auth, GoogleProvider);

    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log('Credential:', credential);
    }
  } catch {

    console.error('Error: something went wrong with firebase');
  }
}
