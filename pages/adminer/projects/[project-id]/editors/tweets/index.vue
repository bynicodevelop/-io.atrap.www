<template>
  <div>
    <div class="mb-8">
      <div v-if="!loading">
        <EditorsTweetsForm
          v-if="!openPlanner"
          v-model:content="content"
          v-model:possibilities="possibilities"
          @onCreateTweet="openPlanner = true"
        />

        <EditorsTweetsPlanner
          v-else
          v-model:possibilities="possibilities"
          v-model:date="date"
          @onCancel="openPlanner = false"
          @onSend="onSend"
        />
      </div>

      <div v-else class="text-left sm:w-full">
        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
          >
            <svg
              class="w-6 h-6 text-green-600"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5 mb-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Plannification en cours
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Veuillez patienter quelques instants. Nous sommes en train de
                plannifier vos tweets en fonction de votre paramètres.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="tweet in tweets" :key="tweet.id">
          <NuxtLink
            :to="{
              name: 'adminer-projects-projectid-editors-tweets-id',
              params: { id: tweet.id },
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
                  <p class="flex items-center text-xs text-gray-500">
                    <svg
                      class="w-3 h-3 mr-2"
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
                      dateHumanize(tweet.createdAt)
                    }}</time>
                  </p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
  LocationMarkerIcon,
  UsersIcon,
  EyeIcon,
  ClockIcon,
} from "@heroicons/vue/solid/index.js";

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import "dayjs/locale/fr";

const { $fire } = useNuxtApp();

dayjs.extend(relativeTime);

definePageMeta({
  layout: "admin",
});

const route = useRoute();

const openPlanner = ref(false);
const content = ref("");
const possibilities = ref(0);
const date = ref(null);
const tweets = ref([]);
const loading = ref(false);

onMounted(async () => {
  const { auth, firestore } = $fire;

  const { projectid } = route.params;

  const tweetRepository = useTweetRepository({ auth, firestore });

  await tweetRepository.getTweets(projectid, (data) => {
    tweets.value = data;
  });
});

const onSend = async () => {
  loading.value = true;

  const { auth, firestore } = $fire;

  const { projectid } = route.params;

  const tweetRepository = useTweetRepository({ auth, firestore });

  await tweetRepository.createTweet({
    projectId: projectid,
    content: content.value,
    possibilities: possibilities.value,
    startSend: date.value[0],
    endSend: date.value[1],
  });

  loading.value = false;
  openPlanner.value = false;

  content.value = "";
  possibilities.value = 0;
  date.value = null;
};

const dateHumanize = (date) => {
  return dayjs.unix(date).locale("fr").fromNow();
};
</script>
