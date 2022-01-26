import { collection, CollectionReference, doc, DocumentSnapshot, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7)

const projectsCollection = (auth, firestore): CollectionReference => collection(firestore, `users/${auth.currentUser.uid}/projects`); 

const createProject = async ({project: { projectName, projectDescription, projectSlug }, auth, firestore}): Promise<void> => {
  // TODO: Attention : si un ID existe déjà ça peut planter
  const projectId = `${projectSlug}-${nanoid().toLowerCase()}`;
  
  const docRef = doc(firestore, `users/${auth.currentUser.uid}/projects`, projectId);

  await setDoc(docRef, {
    name: projectName,
    description: projectDescription,
  })
}

const updateProject = async ({auth, firestore}, project: { id: string, name: string, description: string }): Promise<void> => {
  const { id, name, description } = project;
  
  const projectCol = projectsCollection(auth, firestore);

  const projectDoc = doc(firestore, projectCol.path, id);

  await updateDoc(projectDoc, {
    name,
    description,
  })
}

const getProject = async ({auth, firestore}, projectId: string): Promise<{id: string, description: string, name: string}> => {
  const projectCol = projectsCollection(auth, firestore);
  
  const projectDoc = doc(firestore, projectCol.path, projectId);
  
  const projectRef: DocumentSnapshot = await getDoc(projectDoc);

  return <{id: string, description: string, name: string}>{
    id: projectRef.id,
    ...{ ...projectRef.data() }
  }
}

const getProjects = async ({auth, firestore}, cb): Promise<void> => {
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

export const useProjectRepository = ({auth, firestore}) => {
  return {
    createProject: async (project): Promise<void> => await createProject({project, auth, firestore}),
    updateProject: async (project): Promise<void> => await updateProject({auth, firestore}, project),
    getProject: async (projectId): Promise<{id: string, description: string, name: string}> => await getProject({auth, firestore}, projectId),
    getProjects: async (cb): Promise<void> => await getProjects({auth, firestore}, cb),
  }
}