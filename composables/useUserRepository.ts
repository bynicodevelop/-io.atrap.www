import { onAuthStateChanged } from "firebase/auth";

const getCurrentUser = async ({auth}) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        resolve(user);
        unsubscribe();
      }, reject);
    });
  } 

export const useUserRepository = ({auth, firestore}) => {
    return {
      getCurrentUser: async () => await getCurrentUser({auth}),
    }
  }