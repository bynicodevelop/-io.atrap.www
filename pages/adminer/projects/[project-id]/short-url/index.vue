<template>
  <div>
    <NuxtLayout name="admin">
      <FormsCreateLink v-model:open="openLinkEditor" />

      <div class="pb-4 flex-1 flex justify-end">
        <div class="ml-4 flex items-center lg:ml-6 flex justify-end">
          <button
            @click="openLinkEditor = true"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            <LinkIcon
              class="-ml-1 mr-2 h-5 w-5 text-white"
              aria-hidden="true"
            />
            <span>Créer</span>
          </button>
        </div>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="link in links" :key="link.id">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600 line-clamp-2 truncate">
                  {{ link.url }}
                </p>

                <div class="ml-2 flex-shrink-0 flex">
                  <button
                    @click="onCopyLink(link)"
                    type="button"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    <ClipboardIcon
                      class="flex-shrink-0 my-1 mr-1.5 h-3 w-3 text-green-400"
                      aria-hidden="true"
                    />
                    {{ link.id }}
                  </button>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                    <CursorClickIcon
                      class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                    {{ link.clicks ?? 0 }} Clicks
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import {
  LinkIcon,
  ClipboardIcon,
  CursorClickIcon,
} from "@heroicons/vue/outline/index.js";

const { SITE_URL } = useRuntimeConfig();

const { links, onGetLinks, onCopyLink } = useLinks({ SITE_URL });

const openLinkEditor = ref(false);

const tweets = [
  {
    id: "qsd",
    createdAt: "2020-04-01T12:00:00.000Z",
    status: "planned",
    content: "sqd",
  },
];

onMounted(() => {
  onGetLinks();
});
</script>
