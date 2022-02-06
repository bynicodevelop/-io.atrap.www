<template>
  <div>
    <NuxtLayout name="admin">
      <div class="px-4 sm:px-6 md:px-0">
        <h1 class="text-3xl font-extrabold text-gray-900">Settings</h1>
      </div>
      <div class="px-4 sm:px-6 md:px-0">
        <div class="py-6">
          <!-- Tabs -->
          <div class="lg:hidden">
            <label for="selected-tab" class="sr-only">Select a tab</label>
            <select
              @change="onTabChange($event)"
              id="selected-tab"
              name="selected-tab"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            >
              <option
                v-for="tab in tabs"
                :key="tab.name"
                :selected="tab.current"
              >
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
              @onUpdate="updateProject"
            />
            <SettingsTabsSocialConnect
              v-model="project"
              v-if="tabSelected.name == 'Connexion social'"
            />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  { name: "General", href: "#general", current: true },
  { name: "Connexion social", href: "#social-connect", current: false },
];

const { tabSelected, onSelectIndex, onSelectTab, onTabChange } =
  useSettingsTabManager(tabs);
const { onSuccess } = useNotification();
const { project, getProject, updateProject } = useProject({ onSuccess });

onMounted(async () => {
  await getProject();

  onSelectIndex();
});
</script>
