import { Firestore } from "firebase/firestore";

export default class TweetRespository {
    firestore: Firestore;

    constructor(firestore: Firestore) {
        this.firestore = firestore;
    }

    async getPlannedTweets(user, { projectId, tweetId }, cb?) {
        console.log(user, { projectId, tweetId });

        console.log(user.uid);


        // const docRef = doc(this.firestore, `users/${auth.currentUser.uid}/projects/${projectId}/tweets`, tweetId);

        // const tweetsColRef = collection(firestore, `tweets`);

        // const p = query(tweetsColRef, where("tweetRef", "==", docRef));

        // await onSnapshot(p, (values) => {
        //     console.log(values);

        //     const data = values.docs.map((doc) => {
        //         const { content, publishedAt, tweetRef } = doc.data();

        //         return {
        //             content,
        //             publishedAt,
        //             tweetRef: tweetRef.path,
        //             id: doc.id,
        //         }
        //     });

        //     cb(data);
        // });
    }
}