import { Auth, onAuthStateChanged } from "firebase/auth";

export default class UserRepository {
    auth: Auth;

    constructor(auth) {
        this.auth = auth;
    }

    async getCurrentUser() {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                resolve(user);
                unsubscribe();
            }, reject);
        });
    }
}