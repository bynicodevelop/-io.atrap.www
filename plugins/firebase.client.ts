import { defineNuxtPlugin } from '#app';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useFirebase } from '~~/composables/useFirebase';
import TweetRespository from '~~/libs/TweetRepository';
import UserRepository from '~~/libs/UserRepository';

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const cookies = useCookie('__session');

  const { auth, firestore } = useFirebase();

  // Permet de récupérer l'utilisateur connecté
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in.");

      if (window.location.href.includes("/auth")) {
        router.push({
          name: 'adminer'
        })
      }

    } else {
      console.log("User is signed out.");

      const c: any = cookies.value;

      cookies.value = <any>{ ...c, ...{ isAuthenticated: false } };

      if (window.location.href.includes("adminer")) {
        router.push({
          name: 'auth'
        })
      }
    }
  })

  useState('firebase', () => ({ auth, firestore }));

  useState('userRepository', () => new UserRepository(auth));
  useState('tweetRepository', () => new TweetRespository(firestore));

  console.log("Plugin firebase.client.ts is loaded");

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