import { Auth } from "firebase/auth";
import { collection, CollectionReference, doc, DocumentReference, Firestore, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

export default class ProjectRepository {
    firestore: Firestore;

    auth: Auth;

    constructor(firestore: Firestore, auth: Auth) {
        this.firestore = firestore;
        this.auth = auth;
    }

    async getProjects(cb: Function) {
        const projectRef = collection(this.firestore, `users/${this.auth.currentUser.uid}/projects`);

        onSnapshot(projectRef, (snapshot) => {
            const { docs } = snapshot;

            const projects = docs.map(doc => ({
                id: doc.id,
                ...{
                    projectName: doc.data().name,
                    projectDescription: doc.data().description,
                },
            }));

            cb(projects);
        });
    }

    async _getSocialConnectors(projectRef: DocumentReference) {
        const twitterRef: CollectionReference = collection(this.firestore, projectRef.path, "socials");

        const result = await getDocs(twitterRef);

        return result.docs.map(doc => {
            if (doc.id === 'twitter') {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }
        });
    }

    async getProject(projectId: string, cb: Function) {
        const projectRef = doc(this.firestore, `users/${this.auth.currentUser.uid}/projects`, projectId);

        onSnapshot(projectRef, async (snapshot) => {
            const connectors: any = await this._getSocialConnectors(projectRef);

            const project = {
                ...snapshot.data(),
                id: snapshot.id,
                connectors,
            }

            cb(project);
        })
    }

    async updateProject(project: any) {
        const { id, name, description } = project;

        const projectDoc = doc(this.firestore, `users/${this.auth.currentUser.uid}/projects`, id);

        await updateDoc(projectDoc, {
            name,
            description,
        })
    }
}