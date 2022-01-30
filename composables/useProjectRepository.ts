import { collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { customAlphabet } from 'nanoid';
import { SocialConnectorInterface } from "~~/models/interfaces/SocialConnectorInterface";
import { TwitterConnecterInteface, TwitterConnectModel } from "~~/models/TwitterConnectModel";

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7)

const projectsCollection = (auth, firestore): CollectionReference => collection(firestore, `users/${auth.currentUser.uid}/projects`);

const createProject = async ({ project: { projectName, projectDescription, projectSlug }, auth, firestore }): Promise<void> => {
  // TODO: Attention : si un ID existe déjà ça peut planter
  const projectId = `${projectSlug}-${nanoid().toLowerCase()}`;

  const docRef = doc(firestore, `users/${auth.currentUser.uid}/projects`, projectId);

  await setDoc(docRef, {
    name: projectName,
    description: projectDescription,
  })
}

const updateProject = async ({ auth, firestore }, project: { id: string, name: string, description: string }): Promise<void> => {
  const { id, name, description } = project;

  const projectCol = projectsCollection(auth, firestore);

  const projectDoc = doc(firestore, projectCol.path, id);

  await updateDoc(projectDoc, {
    name,
    description,
  })
}

const getSocialConnectors = async ({ auth, firestore }, projectRef: DocumentReference,): Promise<SocialConnectorInterface[]> => {
  const twitterRef: DocumentReference = collection(firestore, projectRef.path, "socials");

  const result = await getDocs(twitterRef);

  return result.docs.map(doc => {
    if (doc.id === 'twitter') {
      return TwitterConnectModel.formJson(<TwitterConnecterInteface>{
        id: doc.id,
        ...doc.data()
      })
    }
  });
}

const getProject = async ({ auth, firestore }, projectId: string): Promise<{ id: string, description: string, name: string, connectors: SocialConnectorInterface[] }> => {
  const projectCol: CollectionReference = projectsCollection(auth, firestore);

  const projectDoc: DocumentReference = doc(firestore, projectCol.path, projectId);

  const projectRef: DocumentSnapshot = await getDoc(projectDoc);

  const connectors: SocialConnectorInterface[] = await getSocialConnectors({ auth, firestore }, projectRef.ref);

  return <{ id: string, description: string, name: string, connectors: SocialConnectorInterface[] }>{
    id: projectRef.id,
    connectors: connectors,
    ...{ ...projectRef.data() }
  }
}

const getProjects = async ({ auth, firestore }, cb): Promise<void> => {
  const projectRef = projectsCollection(auth, firestore);

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
};

export const useProjectRepository = ({ auth, firestore }) => {
  return {
    createProject: async (project): Promise<void> => await createProject({ project, auth, firestore }),
    updateProject: async (project): Promise<void> => await updateProject({ auth, firestore }, project),
    getProject: async (projectId): Promise<{ id: string, description: string, name: string, connectors: SocialConnectorInterface[] }> => await getProject({ auth, firestore }, projectId),
    getProjects: async (cb): Promise<void> => await getProjects({ auth, firestore }, cb),
  }
}