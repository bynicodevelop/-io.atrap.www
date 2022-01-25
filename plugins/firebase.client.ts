import { defineNuxtPlugin } from '#app';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useFirebase } from '~~/composables/useFirebase';

export default defineNuxtPlugin(async (nuxtApp) => {
  const router = useRouter();
  
    const { auth, firestore } = useFirebase();
  
    // Permet de récupérer l'utilisateur connecté
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in.");

        if(window.location.href.includes("/auth")) {
          router.push({
            name: 'adminer'
          })
        }
        
      } else {
        console.log("User is signed out.");
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