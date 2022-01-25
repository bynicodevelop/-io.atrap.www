import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const setAuthenticatedCookie = (cookies: any, isAuthenticated: boolean) => {
  const c: any = cookies.value;

  cookies.value = <any>{ ...c, ...{ isAuthenticated } };
}

const logout = async ({auth}) : Promise<void> => {
  const cookies = useCookie('__session');

  await signOut(auth);

  setAuthenticatedCookie(cookies, false);
}

const getCurrentUser = async ({auth}) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        resolve(user);
        unsubscribe();
      }, reject);
    });
  } 

const defaultSignIn = async ({auth}, email:string, password:string) : Promise<void> => {
  const cookies = useCookie('__session');

  try {
    await signInWithEmailAndPassword(auth, email, password);

    setAuthenticatedCookie(cookies, true);
  } catch (error) {
    try {
      await logout(auth);
    } catch (error) {
      
    }

    if(error.code === 'auth/user-not-found') {
      throw new Error("user-not-found");
    }
  }
}

const createAccount = async ({auth}, email:string, password:string) : Promise<void> => {
  const cookies = useCookie('__session');

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    setAuthenticatedCookie(cookies, true);
  } catch (error) {
    try {
      await logout(auth);
    } catch (error) {
      
    }

    if(error.code === 'auth/email-already-in-use') {
      throw new Error("email-already-in-use");
    }
  }
}

export const useUserRepository = ({auth}) => {
    return {
      getCurrentUser: async () => await getCurrentUser({auth}),
      defaultSignIn: async (email:string, password:string) : Promise<void> => await defaultSignIn({auth}, email, password),
      createAccount: async (email:string, password:string) : Promise<void> => await createAccount({auth}, email, password),
      logout: async () : Promise<void> => await logout({auth}),
    }
  }