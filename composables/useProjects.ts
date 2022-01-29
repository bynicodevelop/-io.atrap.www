import ProjectRepository from "~~/repositories/ProjectRepository";

export const useProjects = () => {
    const projectRepository = <ProjectRepository>useState('projectRepository').value;

    const projects = ref([]);

    const getProjects = async () => {
        await projectRepository.getProjects((projectsValue) => {
            projects.value = projectsValue;
        });
    }

    return {
        projects,
        getProjects,
    }
}