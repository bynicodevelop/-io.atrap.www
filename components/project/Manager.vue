<template>
  <div class="px-8 py-6">
    <!-- Create Projects -->
    <div class="grid lg:grid-cols-12">
      <div
        class="bg-white shadow sm:rounded-lg lg:col-span-6 lg:col-start-4"
        v-if="typeView == typeViews.CREATE_PROJECT"
      >
        <div class="px-4 py-5 sm:p-6">
          <FormsCreateProject
            v-model="projectProperties"
            @onSubmit="onSumbitProject"
          />
        </div>
      </div>
    </div>

    <ul
      role="list"
      class="grid grid-cols-1 sm:grid-cols-4 gap-4"
      v-if="typeView != typeViews.CREATE_PROJECT"
    >
      <li
        @click="onCreateProject"
        class="col-span-1 flex drop-shadow-md rounded-md aspect-video hover:cursor-pointer"
      >
        <div
          class="flex-1 flex items-center justify-between border border-gray-200 bg-white hover:bg-gray-100 rounded-md truncate"
        >
          <div class="grid grid-rows-2 w-full">
            <div
              class="flex-1 px-4 text-sm truncate flex justify-center items-center"
            >
              <PlusIcon
                class="-ml-1 mr-2 h-5 w-5 text-gray-900"
                aria-hidden="true"
              />
            </div>
            <div
              class="flex justify-center items-center flex-1 w-full text-gray-900"
            >
              Nouveau projet
            </div>
          </div>
        </div>
      </li>

      <NuxtLink
        v-for="project in projects"
        :key="project.id"
        :to="`/adminer/projects/${project.id}`"
      >
        <li
          class="col-span-1 flex drop-shadow-md rounded-md aspect-video hover:cursor-pointer"
        >
          <div
            class="flex-1 flex items-center justify-between border border-gray-200 bg-white hover:bg-gray-100 rounded-md truncate pt-2 pl-2"
          >
            <div class="flex-1 px-4 pt-4 text-sm truncate h-32 min-h-full">
              <div class="text-gray-900 font-medium text-lg">
                {{ project.projectName }}
              </div>
              <div class="text-gray-500 font-medium text-xs italic">
                {{ project.id }}
              </div>
            </div>
          </div>
        </li>
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, DotsVerticalIcon } from "@heroicons/vue/solid/index.js";

const typeViews = {
  CREATE_PROJECT: "createProject",
  LIST_PROJECT: "listProject",
};

const projectProperties = ref({
  projectName: "",
  projectDescription: "",
  projectSlug: "",
});

const { $fire } = useNuxtApp();

let projectRepository = null;

const typeView = ref<string>(typeViews.CREATE_PROJECT);
const projects = <any>ref([]);

if (projects.length === 0) {
  typeView.value = typeViews.CREATE_PROJECT;
} else {
  typeView.value = typeViews.LIST_PROJECT;
}

onMounted(async () => {
  const { auth, firestore } = $fire;

  projectRepository = useProjectRepository({ auth, firestore });
  const userRepository = useUserRepository({ auth, firestore });

  const user = <{ uid: string }>await userRepository.getCurrentUser();

  if (user.uid) {
    projectRepository.getProjects((values) => {
      if (values.length == 0) {
        typeView.value = typeViews.CREATE_PROJECT;
        return;
      }
      projects.value = values;
    });
  }
});

const onCreateProject = async () => {
  console.log("Create project");

  typeView.value = typeViews.CREATE_PROJECT;
};

const onSumbitProject = async (e) => {
  typeView.value = typeViews.LIST_PROJECT;

  projectRepository.createProject(projectProperties.value);

  projectProperties.value.projectName = "";
  projectProperties.value.projectDescription = "";
};
</script>
