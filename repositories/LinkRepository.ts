import { Auth } from "firebase/auth";
import { addDoc, collection, CollectionReference, doc, DocumentReference, Firestore, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { Functions, httpsCallable } from "firebase/functions";

export default class LinkRepository {
    auth: Auth

    functions: Functions

    firestore: Firestore

    constructor(auth: Auth, functions: Functions, firestore: Firestore) {
        this.auth = auth
        this.functions = functions
        this.firestore = firestore
    }

    async createLink(projectId: string, { url,
        title = '',
        utm_source = '',
        utm_medium = '',
        utm_campaign = '',
    }: any) {
        const data = await httpsCallable(this.functions, 'onGenerateLinkId')({
            url,
            title,
            utm_source,
            utm_medium,
            utm_campaign,
            projectId,
            userId: this.auth.currentUser.uid,
        });

        console.log(data);
    }

    async updateLink(projectId: string, linkId: string, {
        title = '',
    }: any) {
        const linkDoc: DocumentReference = doc(this.firestore, `users/${this.auth.currentUser.uid}/projects/${projectId}/links/${linkId}`);

        await updateDoc(linkDoc, { title })
    }

    async getLinks(projectId: string, cb: Function) {
        const linkCol: CollectionReference = collection(this.firestore, `users/${this.auth.currentUser.uid}/projects/${projectId}/links`);

        onSnapshot(linkCol, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            cb(data);
        });
    }

    async getLinkById(linkId: string): Promise<any | null> {
        const docRef: DocumentReference = doc(this.firestore, `links/${linkId}`);

        const link = await getDoc(docRef);

        const { linkRef } = link.data();

        const linkFromProject = await getDoc(linkRef);

        if (linkFromProject.exists()) {
            const clickDoc: CollectionReference = collection(this.firestore, `${linkFromProject.ref.path}/clicks`);

            await addDoc(clickDoc, {
                date: serverTimestamp(),
            });

            console.log("Add click to", `${linkFromProject.ref.path}/clicks`);

            return linkFromProject.data();
        }

        return null;
    }
}