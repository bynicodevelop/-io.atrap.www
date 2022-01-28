import { addDoc, collection, CollectionReference, doc, DocumentReference, getDoc, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";

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

    const p = query(colRef, orderBy("createdAt", "desc"));

    await onSnapshot(p, (values) => {
        const data = values.docs.map((doc) => {
            const { content, possibilities, createdAt, status } = doc.data();

            return {
                content,
                status,
                possibilities,
                createdAt: createdAt.seconds,
                id: doc.id,
            }
        });

        cb(data);
    });
}

const getPlannedTweets = async ({ auth, firestore }, { projectId, tweetId }, cb) => {
    const docRef = doc(firestore, `users/${auth.currentUser.uid}/projects/${projectId}/tweets`, tweetId);

    const tweetsColRef = collection(firestore, `tweets`);

    const p = query(tweetsColRef, where("tweetRef", "==", docRef));

    await onSnapshot(p, (values) => {
        console.log(values);

        const data = values.docs.map((doc) => {
            const { content, publishedAt, tweetRef } = doc.data();

            return {
                content,
                publishedAt,
                tweetRef: tweetRef.path,
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
        getPlannedTweets: async ({ projectId, tweetId }, cb) => getPlannedTweets({ auth, firestore }, { projectId, tweetId }, cb),
    }
}