import ProjectRepository from "~~/repositories/ProjectRepository";

export const useProject = ({ onSuccess }) => {
    const route = useRoute();
    const projectRepository = <ProjectRepository>useState('projectRepository').value;

    const { projectid } = route.params;

    const project = ref({});
    const connectors = ref([]);
    const projectLoaded = ref(false);

    const getProject = () => {
        projectRepository.getProject(projectid as string, (projectModel) => {
            connectors.value = projectModel.connectors;
            project.value = projectModel;

            projectLoaded.value = true;
        });
    }

    const updateProject = async () => {
        await projectRepository.updateProject(project.value);

        onSuccess("Succès", "Les modifications ont été enregistrées.");
    }

    const getConnector = (connectorId: string) => {
        return connectors.value.find(c => c.id === connectorId);
    }

    return {
        projectLoaded,
        project,
        getProject,
        updateProject,
        getConnector,
    }
}