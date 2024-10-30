import { app } from "@/app/api/firebase/config"
import { getAuth, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
//DOCUMENTATION: https://firebase.google.com/docs/auth/web/manage-users#web

const auth = getAuth(app);


//TODOS: Implement functions below


//get currently signed in user



//register new users


//google provider
export async function signInWithGoogle() {
  const GoogleProvider = await new GoogleAuthProvider();
  await signInWithPopup(auth, GoogleProvider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
