import { Auth } from "firebase/auth";
import { collection, Firestore, onSnapshot } from "firebase/firestore";

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
}