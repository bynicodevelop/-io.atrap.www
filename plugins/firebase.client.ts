import { defineNuxtPlugin } from '#app'
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, onAuthStateChanged, isSignInWithEmailLink, signInWithEmailLink, signOut } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { useFirebase } from '~~/composables/useFirebase';

const validEmailLink = async (auth, emailLink, cookies) => {
  if (isSignInWithEmailLink(auth, emailLink)) {
    const email = window.localStorage.getItem("emailForSignIn");

    if(!email) return;

    try {
      const result = await signInWithEmailLink(auth, email, emailLink);

      window.localStorage.removeItem("emailForSignIn");

      const c = cookies.value;

      cookies.value = <any>{ ...c, ...{ isAuthenticatedted: true } };

      const router = useRouter();

      router.push("/adminer");

      console.log("User signed in with success: ", result);
    } catch (error) {
      console.log("Error signing in with email link: ", error);
    }
  }
};

export default defineNuxtPlugin(async (nuxtApp) => {
    const { auth, firestore } = useFirebase();
    
    const cookies = useCookie('__session');

    // Permet l'authentification pas lien de connexion
    await validEmailLink(auth, window.location.href, cookies);
  
    // Permet de récupérer l'utilisateur connecté
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in.");

        useState("user", () => ({
          uid: user.uid,
        }));
      } else {
        console.log("User is signed out.");

        useState("user", () => null);

        const c = cookies.value;

        cookies.value = <any>{ ...c, ...{ isAuthenticatedted: false } };
      }
    })

    return {
      provide: {
        fire: {
          auth, 
          firestore,
          logout: () => signOut(auth),
        }
      }
    }
  })