import { addDoc, collection, CollectionReference, getDocs, onSnapshot, QuerySnapshot, serverTimestamp } from "firebase/firestore";
import { countBy } from "lodash";

const createTweet = async ({ auth, firestore }, tweet) => {
    const { projectId } = tweet;

    delete tweet.projectId;

    const colRef: CollectionReference = collection(firestore, `users/${auth.currentUser.uid}/projects/${projectId}/tweets`);

    await addDoc(colRef, {
        ...tweet,
        createdAt: serverTimestamp(),
    });
}

const getTweets = async ({ auth, firestore }, projectId, cb) => {
    const colRef: CollectionReference = collection(firestore, `users/${auth.currentUser.uid}/projects/${projectId}/tweets`);

    const docsRef = await onSnapshot(colRef, (values) => {
        const data = values.docs.map((doc) => {
            const { content, possibilities, createdAt } = doc.data();

            return {
                content,
                status: "",
                possibilities,
                createdAt: createdAt.seconds,
                id: doc.id,
            }
        });

        cb(data);
    });
}

export const useTweetRepository = ({ auth, firestore }) => {
    return {
        createTweet: async (tweet) => createTweet({ auth, firestore }, tweet),
        getTweets: async (projectId, cb) => getTweets({ auth, firestore }, projectId, cb),
    }
}