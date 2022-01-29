<template>
  <div>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="tweet in tweets" :key="tweet.id">
          <div class="block hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600 line-clamp-2 truncate">
                  {{ tweet.content }}
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p
                    :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                      $date.isHappened(tweet.publishedAt)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`"
                  >
                    {{
                      $date.isHappened(tweet.publishedAt)
                        ? "Publié"
                        : "En attente"
                    }}
                  </p>
                </div>
              </div>

              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-xs text-gray-400">
                    <svg
                      class="w-5 h-5 mr-2"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                    {{ tweet.possibilities }}
                  </p>
                  <button
                    v-if="tweet.status != 'published'"
                    @click="onPublish(tweet)"
                    class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-2"
                  >
                    <CloudUploadIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Publier maintenant
                  </button>
                  <button
                    v-if="tweet.status != 'published'"
                    @click="onPublish(tweet)"
                    class="mt-2 flex items-center text-sm text-rose-500 sm:mt-0 sm:ml-2"
                  >
                    <TrashIcon
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-rose-400"
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
                    {{
                      $date.isHappened(tweet.publishedAt)
                        ? "Publié"
                        : "Sera publié"
                    }}
                    {{ " " }}
                    <time :datetime="tweet.publishedAt">{{
                      $date.humanize(tweet.publishedAt)
                    }}</time>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {
  CloudUploadIcon,
  CalendarIcon,
  TrashIcon,
} from "@heroicons/vue/outline/index.js";

definePageMeta({
  layout: "admin",
});

const { $date } = useNuxtApp();

const { tweets, getTweets, onPublish } = useTweetPlanned();

onMounted(async () => {
  await getTweets();
});
</script>
