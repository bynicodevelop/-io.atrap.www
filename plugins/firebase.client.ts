import { defineNuxtPlugin } from '#app';
import { useFirebase } from '~~/composables/useFirebase';
import UserRepository from '~~/repositories/UserRepository';

export default defineNuxtPlugin(async (nuxtApp) => {
  const router = useRouter();

  const { auth, firestore } = useFirebase();

  const userRepository = new UserRepository(auth);

  useState('userRepository', () => userRepository);

  const user = await userRepository.getCurrentUser();

  if (user) {
    console.log("User is logged in");

    if (window.location.href.includes("/auth")) {
      router.push({
        name: 'adminer'
      })
    }
  } else {
    console.log("User is not logged in");

    if (window.location.href.includes("adminer")) {
      router.push({
        name: 'auth'
      })
    }
  }

  console.log("firebase plugin loaded");

  return {
    provide: {
      fire: {
        auth,
        firestore,
      }
    }
  }
})