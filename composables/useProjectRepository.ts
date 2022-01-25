import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7)

const projectsCollection = (auth, firestore) => collection(firestore, `users/${auth.currentUser.uid}/projects`); 

const createProject = async ({project: { projectName, projectDescription, projectSlug }, auth, firestore}) => {
  // TODO: Attention : si un ID existe déjà ça peut planter
  const projectId = `${projectSlug}-${nanoid().toLowerCase()}`;
  
  const docRef = doc(firestore, `users/${auth.currentUser.uid}/projects/`, projectId);

  await setDoc(docRef, {
    name: projectName,
    description: projectDescription,
  })
}

const getProjects = async ({auth, firestore}, cb) => {
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

const getCurrentUser = async ({auth}) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
      unsubscribe();
    }, reject);
  });
} 

export const useProjectRepository = ({auth, firestore}) => {
  return {
    createProject: async (project) => await createProject({project, auth, firestore}),
    getProjects: async (cb) => await getProjects({auth, firestore}, cb),
    getCurrentUser: async () => await getCurrentUser({auth}),
  }
}