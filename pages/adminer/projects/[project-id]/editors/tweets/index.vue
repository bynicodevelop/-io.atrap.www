<template>
  <div>
    <form action="#" class="relative mb-8">
      <div
        class="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
      >
        <label for="description" class="sr-only">Description</label>
        <textarea
          v-model="content"
          rows="2"
          name="content"
          id="content"
          class="block w-full border-0 py-0 pt-2.5 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Écrivez votre twitter... (e.g. {Hello|Bonjour|Salut} {World|Monde})"
        />

        <!-- Spacer element to match the height of the toolbar -->
        <div aria-hidden="true">
          <div class="py-2">
            <div class="h-9" />
          </div>
          <div class="h-px" />
          <div class="py-2">
            <div class="py-px">
              <div class="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 inset-x-px">
        <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
        <div
          class="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3"
        ></div>
        <div
          class="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3"
        >
          <div class="flex">
            <span
              class="text-sm text-gray-500 group-hover:text-gray-600 italic"
            >
              {{ possibilites }} tweets possibles
            </span>
          </div>
          <div class="flex-shrink-0">
            <button
              :disabled="!content || tweetGenerating"
              @click.prevent="createTweets"
              type="submit"
              :class="`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                !content || tweetGenerating
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`"
            >
              Créer
            </button>
          </div>
        </div>
      </div>
    </form>

    <div
      v-if="!tweets.length"
      class="relative block w-full p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-offset-2"
    >
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
        />
      </svg>
      <span class="mt-2 block text-sm font-medium text-gray-900">
        Nous attendons vos nouveaux tweets...
      </span>
    </div>

    <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="tweet in tweets" :key="tweet.id">
          <a href="#" class="block hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-600 line-clamp-2 truncate">
                  {{ tweet.content }}
                </p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    {{ tweet.status }}
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
                      tweet.createdAt
                    }}</time>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.extend(relativeTime);

import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
  LocationMarkerIcon,
  UsersIcon,
  EyeIcon,
} from "@heroicons/vue/solid/index.js";

import stringMath from "string-math";
import spin from "@bob6664569/content-spinner";

import { isEmpty } from "lodash";

definePageMeta({
  layout: "admin",
});

const tweetGenerating = ref(false);
const content = ref("");
const possibilites = ref(0);
const tweets = ref([]);

watch(content, (value) => {
  possibilites.value = calculatePossibilities(value, possibilites.value);
});

const calculatePossibilities = (
  value: string,
  possibilites: number
): number => {
  if (isEmpty(value)) {
    return 0;
  }

  let result = value
    .split("")
    .filter((item) => item == "{" || item == "}" || item == "|")
    .map((char) => {
      if (char == "{") {
        return "(1";
      }

      if (char == "}") {
        return ")";
      }

      if (char == "|") {
        return "+1";
      }

      return char;
    })
    .join("");

  if (isEmpty(result)) {
    return 1;
  }

  const convertStringToMath = {
    ")(": ")*(",
    "+1(": "+(",
    "1(": "1+(",
  };

  result = Object.keys(convertStringToMath).reduce((acc, key) => {
    return acc.replace(key, convertStringToMath[key]);
  }, result);

  try {
    possibilites = stringMath(result);
  } catch (error) {}

  return possibilites;
};

const createTweets = () => {
  tweetGenerating.value = true;

  const list = [];

  while (list.length < possibilites.value) {
    const tweetContent = spin(content.value);

    if (list.includes(tweetContent)) {
      continue;
    }

    list.push(tweetContent);
  }

  tweets.value.push({
    content: content.value,
    status: "En cours",
    possibilities: possibilites.value,
    createdAt: dayjs().locale("fr").from(dayjs()),
    tweets: list,
  });

  content.value = "";
  tweetGenerating.value = false;
};
</script>
