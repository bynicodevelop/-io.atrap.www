<template>
  <div>
    <NuxtLayout name="admin">
      <div class="py-8 flex-1 px-4 flex justify-end">
        <div class="ml-4 flex items-center lg:ml-6 flex justify-end">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
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
          <li v-for="tweet in tweets" :key="tweet.id">
            <NuxtLink
              :to="{
                name: 'adminer-projects-projectid-editors-tweets-id',
                params: {
                  id: tweet.id,
                },
              }"
              class="block hover:bg-gray-50"
            >
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-600 line-clamp-2 truncate">
                    {{ tweet.content }}
                  </p>
                  <div class="ml-2 flex-shrink-0 flex">
                    <p
                      v-if="tweet.status !== 'deleted'"
                      :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                        tweet.status !== 'planned'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`"
                    >
                      {{
                        tweet.status !== "planned"
                          ? "Plannification en cours..."
                          : "Plannifié"
                      }}
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <button
                      v-if="tweet.status == 'planned'"
                      class="mt-2 flex items-center text-sm text-rose-500 sm:mt-0"
                    >
                      <TrashIcon
                        class="flex-shrink-0 h-5 w-5 text-rose-400"
                        aria-hidden="true"
                      />
                      Supprimer
                    </button>
                  </div>
                  <div
                    class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                  >
                    <CalendarIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      Créé
                      {{ " " }}
                      <time :datetime="tweet.createdAt">{{
                        $date.humanize(tweet.createdAt)
                      }}</time>
                    </p>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import {
  CalendarIcon,
  PlayIcon,
  PauseIcon,
  TrashIcon,
  RefreshIcon,
} from "@heroicons/vue/solid/index.js";

import { LinkIcon } from "@heroicons/vue/outline/index.js";

const tweets = [
  {
    id: "qsd",
    createdAt: "2020-04-01T12:00:00.000Z",
    status: "planned",
    content: "sqd",
  },
];
</script>
