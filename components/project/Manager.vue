<template>
  <div class="px-8 py-6">
    <div class="grid justify-items-center" v-if="typeView == typeViews.LOADING">
      Loading...
    </div>

    <!-- Create Projects -->
    <div class="grid lg:grid-cols-12">
      <div
        class="bg-white shadow sm:rounded-lg lg:col-span-6 lg:col-start-4"
        v-if="typeView == typeViews.CREATE_PROJECT"
      >
        <div class="px-4 py-5 sm:p-6">
          <FormsCreateProject
            :isFirstCreate="projects.length == 0"
            v-model="projectProperties"
            @onSubmit="onSumbitProject"
            @onCancel="onCancelProject"
          />
        </div>
      </div>
    </div>
    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <PlusIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Créer un nouveau
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">Projet</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <a
              @click="onCreateProject"
              href="#"
              class="font-medium text-cyan-700 hover:text-cyan-900"
            >
              Créer un projet
            </a>
          </div>
        </div>
      </div>

      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white overflow-hidden shadow rounded-lg"
      >
        <div class="p-5">
          <div class="flex items-center">
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  {{ project.id }}
                </dt>
                <dd>
                  <div class="text-lg font-medium text-gray-900">
                    {{ project.projectName }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <NuxtLink
              :to="`/adminer/projects/${project.id}`"
              class="font-medium text-cyan-700 hover:text-cyan-900"
            >
              Accéder
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, DotsVerticalIcon } from "@heroicons/vue/solid/index.js";

const route = useRoute();
const router = useRouter();

const typeViews = {
  LOADING: "loading",
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

const typeView = ref<string>(typeViews.LOADING);
const projects = <any>ref([]);

onMounted(async () => {
  const { auth, firestore } = $fire;

  projectRepository = useProjectRepository({ auth, firestore });
  const userRepository = useUserRepository({ auth });

  const user = <{ uid: string }>await userRepository.getCurrentUser();

  if (user.uid) {
    projectRepository.getProjects((values) => {
      if (values.length == 0) {
        resetFields();

        typeView.value = typeViews.CREATE_PROJECT;
        return;
      }

      projects.value = values;

      typeView.value = typeViews.LIST_PROJECT;

      if (route.hash == "#create-project") {
        onCreateProject();

        router.push({
          hash: "",
        });
      }
    });
  }
});

const onCreateProject = async () => {
  typeView.value = typeViews.CREATE_PROJECT;
};

const onSumbitProject = async (e) => {
  await projectRepository.createProject(projectProperties.value);

  resetFields();

  typeView.value = typeViews.LIST_PROJECT;
};

const onCancelProject = () => {
  resetFields();

  typeView.value = typeViews.LIST_PROJECT;
};

const resetFields = () => {
  projectProperties.value.projectName = "";
  projectProperties.value.projectDescription = "";
};
</script>
