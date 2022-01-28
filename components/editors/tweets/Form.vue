<template>
  <form @submit.prevent="$emit('onCreateTweet')" class="relative">
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
          <span class="text-sm text-gray-500 group-hover:text-gray-600 italic">
            {{ possibilities }} tweets possibles
          </span>
        </div>

        <div class="flex-shrink-0">
          <button
            :disabled="!content"
            type="submit"
            :class="`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              !content ? 'opacity-50 cursor-not-allowed' : ''
            }`"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { tweetPossibilities } from "~/utils/tweetPossibilities";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  possibilities: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits([
  "onCreateTweet",
  "update:possibilities",
  "update:content",
]);

const possibilities = computed({
  get() {
    return props.possibilities;
  },
  set(value) {
    emits("update:possibilities", value);
  },
});

const content = computed({
  get() {
    return props.content;
  },
  set(value) {
    emits(
      "update:possibilities",
      tweetPossibilities(value, props.possibilities)
    );
    emits("update:content", value);
  },
});
</script>
