import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { TwitterConnecterInteface, TwitterConnectModel } from "~~/models/TwitterConnectModel";
import { isEmpty, isUndefined } from "lodash";

const isValidTwitterConnect = (data: TwitterConnecterInteface) => {
    let isValid = true

    Object.keys(data).forEach(key => {
        if (isUndefined(data[key]) || isEmpty(data[key])) {
            isValid = false;
        }
    })

    return isValid;
}

const setTwitterConnect = async ({ auth, firestore }, data: TwitterConnecterInteface): Promise<void> => {
    const { projectId, accessToken, accessSecret, userId, screenName, profileImageUrl, name } = data;

    if (!isValidTwitterConnect(data)) {
        throw new Error("invalid twitter connect data");
    }

    const twitterConnectModel = TwitterConnectModel.formJson(<TwitterConnecterInteface>{ accessToken, accessSecret, userId, screenName, profileImageUrl, name });

    const colRef = collection(firestore, `users/${auth.currentUser.uid}/projects/${projectId}/socials`);

    const docRef = doc(colRef, "twitter");

    try {
        await setDoc(docRef, twitterConnectModel.toJsonToSave());
    } catch (error) {
        throw new Error("set twitter connect error");
    }
}

const revokeTwitterConnect = async ({ auth, firestore }, projectId: string): Promise<void> => {
    const docRef = doc(firestore, `users/${auth.currentUser.uid}/projects/${projectId}/socials`, 'twitter');

    await deleteDoc(docRef);
}

export const useSocialConnectRepository = ({ auth, firestore }) => {
    return {
        setTwitterConnect: async (data) => setTwitterConnect({ auth, firestore }, data),
        revokeTwitterConnect: async (projectId) => revokeTwitterConnect({ auth, firestore }, projectId)
    }
}

