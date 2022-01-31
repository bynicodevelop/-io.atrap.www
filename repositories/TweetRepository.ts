import { Auth } from "firebase/auth";
import { addDoc, collection, CollectionReference, deleteDoc, doc, Firestore, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

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
                const { content, possibilities, createdAt, status, publishStatus } = doc.data();

                return {
                    content,
                    status: status || '',
                    possibilities: possibilities || 0,
                    publishStatus: publishStatus || false,
                    createdAt: !createdAt ? new Date().getTime() : createdAt.seconds,
                    id: doc.id,
                }
            });

            cb(data);
        });
    }

    async getTweet(projectId: string, tweetId: string) {
        const docRef = doc(this.firestore, `users/${this.auth.currentUser.uid}/projects/${projectId}/tweets`, tweetId);

        const tweetRef = await getDoc(docRef);

        return {
            ...tweetRef.data(),
            id: tweetRef.id,
            ref: tweetRef.ref,
        }
    }

    getTweetById(projectId: string, tweetId: string, cb: Function): void {
        const docRef = doc(this.firestore, `users/${this.auth.currentUser.uid}/projects/${projectId}/tweets`, tweetId);

        onSnapshot(docRef, (values) => {
            cb({
                ...values.data(),
                id: values.id,
                ref: values.ref,
            })
        })
    }

    async getTweetsById(projectId: string, tweetId: string, cb: Function): Promise<void> {
        const tweetModel = await this.getTweet(projectId, tweetId);

        const tweetsColRef = collection(this.firestore, `tweets`);

        const p = query(tweetsColRef, where("tweetRef", "==", tweetModel.ref), orderBy("publishedAt", "asc"));

        await onSnapshot(p, (values) => {
            const dataModel = values.docs.map((doc) => {
                const { content, publishedAt, tweetRef, status } = doc.data();

                return {
                    content,
                    status: status ?? '',
                    publishedAt: !publishedAt ? new Date().getTime() : publishedAt.seconds,
                    tweetRef: tweetRef.path,
                    id: doc.id,
                }
            });

            cb(dataModel);
        });
    }

    async updateTweet(projectId: string, tweetId: string, data: {}): Promise<void> {
        const docRef = doc(this.firestore, `users/${this.auth.currentUser.uid}/projects/${projectId}/tweets`, tweetId);

        await updateDoc(docRef, data);
    }

    async deleteTweetContent(projectId: string, tweetId: string): Promise<void> {
        const docRef = doc(this.firestore, `tweets`, tweetId);

        await deleteDoc(docRef);
    }

    async deleteTweet(projectId: string, tweetId: string): Promise<void> {
        const docRef = doc(this.firestore, `users/${this.auth.currentUser.uid}/projects/${projectId}/tweets`, tweetId);

        await deleteDoc(docRef);
    }

    async sendTweet(projectId: string, tweetId: string): Promise<void> {
        const docRef = doc(this.firestore, `tweets`, tweetId);

        await updateDoc(docRef, {
            publishedAt: serverTimestamp(),
        });
    }
}