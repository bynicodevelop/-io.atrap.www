import { Auth } from "firebase/auth";
import { addDoc, collection, CollectionReference, Firestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

export default class TweetRepository {
    firestore: Firestore

    auth: Auth;

    constructor(firestore: Firestore, auth: Auth) {
        this.firestore = firestore;
        this.auth = auth;
    }

    async createTweet({ projectId, content, startAt, endAt }): Promise<void> {
        const colRef: CollectionReference = collection(this.firestore, `users/${this.auth.currentUser.uid}/projects/${projectId}/tweets`);

        await addDoc(colRef, {
            content,
            startAt,
            endAt,
            createdAt: serverTimestamp(),
        });
    }

    async getTweets(projectId: string, cb: Function): Promise<void> {
        const colRef: CollectionReference = collection(this.firestore, `users/${this.auth.currentUser.uid}/projects/${projectId}/tweets`);

        const p = query(colRef, orderBy("createdAt", "desc"));

        await onSnapshot(p, (values) => {
            const data = values.docs.map((doc) => {
                const { content, possibilities, createdAt, status } = doc.data();

                return {
                    content,
                    status: status || '',
                    possibilities: possibilities || 0,
                    createdAt: !createdAt ? new Date().getTime() : createdAt.seconds,
                    id: doc.id,
                }
            });

            cb(data);
        });
    }
}