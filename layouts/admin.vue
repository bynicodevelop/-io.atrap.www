<template>
  <div class="h-full">
    <Notification />

    <div class="h-full">
      <AdminSidebar v-model:sidebarOpen="sidebarOpen" />

      <div class="md:pl-64 flex flex-col h-full">
        <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            @click="sidebarOpen = true"
          >
            <span class="sr-only">Open sidebar</span>
            <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
          </button>
          <div
            class="flex-1 px-4 flex justify-between sm:items-center sm:justify-between"
          >
            <div class="flex-1 min-w-0 pt-2">
              <ProjectSwitcher class="w-48" :projects="projects" />
            </div>

            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <ProfileAvatarMenu />
            </div>
          </div>
        </div>

        <main class="flex-1">
          <div class="h-full">
            <div class="relative max-w-4xl mx-auto md:px-8 xl:px-0">
              <div class="pt-10 pb-16">
                <!-- Replace with your content -->
                <slot />
                <!-- /End replace -->
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { MenuAlt2Icon, XIcon } from "@heroicons/vue/outline/index.js";

import { SearchIcon, AdjustmentsIcon } from "@heroicons/vue/solid/index.js";

useMeta({
  bodyAttrs: {
    class: "h-full",
  },
  htmlAttrs: {
    class: "h-full",
  },
});

const { projects, getProjects } = useProjects();

const sidebarOpen = ref(false);

onMounted(async () => {
  await getProjects();
});
</script>
