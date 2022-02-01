import ProjectRepository from "~~/repositories/ProjectRepository";

export const useProject = ({ onSuccess }) => {
    const route = useRoute();
    const projectRepository = <ProjectRepository>useState('projectRepository').value;

    const { projectid } = route.params;

    const project = ref({});

    const getProject = () => {
        projectRepository.getProject(projectid as string, (projectModel) => {
            project.value = projectModel;
        });
    }

    const updateProject = async () => {
        await projectRepository.updateProject(project.value);

        onSuccess("Succès", "Les modifications ont été enregistrées.");
    }

    return {
        project,
        getProject,
        updateProject,
    }
}