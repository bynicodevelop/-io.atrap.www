<template>
  <div>
    <SimpleNotif
      :show="paramsNotif.show"
      :title="paramsNotif.title"
      :subtitle="paramsNotif.subtitle"
      :timeout="10000"
    />

    <div class="px-4 sm:px-6 md:px-0">
      <h1 class="text-3xl font-extrabold text-gray-900">Settings</h1>
    </div>
    <div class="px-4 sm:px-6 md:px-0">
      <div class="py-6">
        <!-- Tabs -->
        <div class="lg:hidden">
          <label for="selected-tab" class="sr-only">Select a tab</label>
          <select
            id="selected-tab"
            name="selected-tab"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          >
            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden lg:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <a
                @click="onSelectTab(tab)"
                v-for="tab in tabs"
                :key="tab.name"
                :href="tab.href"
                :class="[
                  tab.current
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                ]"
              >
                {{ tab.name }}
              </a>
            </nav>
          </div>
        </div>

        <div class="mt-10 divide-y divide-gray-200">
          <SettingsTabsGeneral
            v-if="tabSelected.name == 'General'"
            v-model="project"
            @onUpdate="onUpdate"
          />
          <SettingsTabsSocialConnect
            v-if="tabSelected.name == 'Connexion social'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { $fire } = useNuxtApp();
const route = useRoute();

const { auth, firestore } = $fire;

const { projectid } = route.params;

const projectRepository = useProjectRepository({ auth, firestore });

const tabs = [
  { name: "General", href: "#", current: true },
  { name: "Connexion social", href: "#", current: false },
];

const { data } = await useAsyncData("project", async () => {
  return await projectRepository.getProject(projectid);
});

const tabSelected = ref(tabs[0]);

const project = reactive({
  id: data.value.id,
  name: data.value.name,
  description: data.value.description,
});

const paramsNotif = reactive({
  show: false,
  title: "",
  subtitle: "",
});

watch(tabSelected, (value) => {
  tabs.forEach((t) => {
    t.current = t.name == value.name;
  });
});

const onSelectTab = (tab: any) => {
  tabSelected.value = tab;
};

const onUpdate = async () => {
  clearNotifications();

  await projectRepository.updateProject(project);

  sendNotification("Vos données ont été mises à jour");
};

const clearNotifications = () => {
  paramsNotif.show = false;
  paramsNotif.title = "";
  paramsNotif.subtitle = "";
};

const sendNotification = (message: string) => {
  paramsNotif.show = true;
  paramsNotif.title = "Notification";
  paramsNotif.subtitle = message;
};
</script>
