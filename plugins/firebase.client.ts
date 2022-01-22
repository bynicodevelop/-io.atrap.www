import { defineNuxtPlugin } from '#app'
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, onAuthStateChanged, isSignInWithEmailLink, signInWithEmailLink, signOut } from "firebase/auth";
import { CookieRef } from 'nuxt3/dist/app/composables/cookie';


const validEmailLink = async (auth, emailLink, cookies) => {
  if (isSignInWithEmailLink(auth, emailLink)) {
    const email = window.localStorage.getItem("emailForSignIn");

    if(!email) return;

    try {
      const result = await signInWithEmailLink(auth, email, emailLink);

      window.localStorage.removeItem("emailForSignIn");

      const c = cookies.value;

      cookies.value = <any>{ ...c, ...{ isAuthentucated: true } };

      console.log("User signed in with success: ", result);
    } catch (error) {
      console.log("Error signing in with email link: ", error);
    }
  }
};

export default defineNuxtPlugin(async (nuxtApp) => {  
    const {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} = useRuntimeConfig();
  
    const firebaseApp = initializeApp({
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID,
    });

    const cookies = useCookie('__session')
    
    const auth = getAuth(firebaseApp);

    connectAuthEmulator(auth, "http://localhost:9099");

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

        cookies.value = <any>{ ...c, ...{ isAuthentucated: false } };
      }
    })

    return {
      provide: {
        fire: {
          auth, 
          logout: () => signOut(auth),
        }
      }
    }
  })