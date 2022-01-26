import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { TwitterConnecterInteface, TwitterConnectModel } from "~~/models/TwitterConnectModel";
import { isEmpty } from "lodash";

const isValidTwitterConnect = (data: TwitterConnecterInteface) => {
    if (isEmpty(data.accessSecret)
        || isEmpty(data.accessToken)
        || isEmpty(data.userId)
        || isEmpty(data.screenName)
        || isEmpty(data.profileImageUrl)
        || isEmpty(data.name)) {

        return false;
    }


    return true;
}

const setTwitterConnect = async ({ auth, firestore }, data: TwitterConnecterInteface): Promise<void> => {
    const { projectId, accessToken, accessSecret, userId, screenName, profileImageUrl, name } = data;


    if (!isValidTwitterConnect(data)) {
        throw new Error("invalid twitter connect data");

    }

    const twitterConnectModel = TwitterConnectModel.formJson(<TwitterConnecterInteface>{ accessToken, accessSecret, userId, screenName, profileImageUrl, name });

    const colRef = collection(firestore, `users/${auth.currentUser.uid}/projects/${projectId}/socials`);

    const docRef = doc(colRef, "twitter");

    await setDoc(docRef, twitterConnectModel.toJson());
}

export const useSocialConnectRepository = ({ auth, firestore }) => {
    return {
        setTwitterConnect: async (data) => setTwitterConnect({ auth, firestore }, data)
    }
}

