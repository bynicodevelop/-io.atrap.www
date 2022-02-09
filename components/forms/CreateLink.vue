<template>
  <div>
    <TransitionRoot as="template" :show="open" class="z-50">
      <Dialog
        as="div"
        class="fixed inset-0 overflow-hidden"
        @close="open = false"
      >
        <div class="absolute inset-0 overflow-hidden">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>
          <DialogOverlay class="absolute inset-0" />

          <div class="fixed inset-y-0 pl-16 max-w-full right-0 flex">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <div class="w-screen max-w-md">
                <form
                  @submit.prevent="onCreateLink(linkData)"
                  class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"
                >
                  <div class="flex-1 h-0 overflow-y-auto">
                    <div class="py-6 px-4 bg-indigo-700 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-lg font-medium text-white">
                          Raccourcir un lien
                        </DialogTitle>
                        <div class="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            class="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            @click="open = false"
                          >
                            <span class="sr-only">Close panel</span>
                            <XIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 flex flex-col justify-between">
                      <div class="px-4 divide-y divide-gray-200 sm:px-6">
                        <div class="space-y-6 pt-6 pb-5">
                          <InputText
                            v-model="linkData.url"
                            inputName="url"
                            inputLabel="Url"
                            inputPlaceholder=" "
                            errorMessage="Veuillez saisir une url valide."
                            v-model:inputError="urlError"
                            :inputDisabled="linkData.id !== ''"
                          />

                          <InputText
                            v-model="linkData.title"
                            inputName="title"
                            inputLabel="Titre"
                            inputPlaceholder=" "
                          />

                          <div class="flex-shrink-0 px-4 py-4 flex justify-end">
                            <button
                              type="button"
                              class="bg-white py-2 px-4 rounded-md text-sm font-medium text-orange-700 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                              @click="onResetClick(linkData)"
                            >
                              Reset clicks
                            </button>
                            <button
                              type="button"
                              class="ml-4 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              @click="open = false"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { XIcon } from "@heroicons/vue/outline/index.js";

const fields = {
  id: "",
  url: "",
  title: "",
};

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  linkData: {
    type: Object,
    default: {},
  },
});

const { SITE_URL } = useRuntimeConfig();

const loadingState = useLoadingState();

const { loading } = loadingState;

const { urlError, onCreateLink, onResetClick } = useLinks(
  { SITE_URL },
  loadingState
);

const emits = defineEmits("update:open", "update:linkData");

const linkData = computed({
  get() {
    return props.linkData;
  },
  set(value) {
    emits("update:linkData", value);
  },
});

const open = computed({
  get() {
    return props.open;
  },
  set(value) {
    emits("update:open", value);
  },
});

watch(loading, (value) => {
  if (value == 2) {
    open.value = false;
  }
});

const advancedMode = ref(false);

const itemsSource = [
  {
    value: "website",
    label: "Site Web",
  },
  {
    value: "newsletter",
    label: "Newsletter",
  },
  {
    value: "google",
    label: "Google",
  },
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "twitter",
    label: "Twitter",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "tiktok",
    label: "TikTok",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
  },
  {
    value: "youtube",
    label: "YouTube",
  },
  {
    value: "pinterest",
    label: "Pinterest",
  },
  {
    value: "reddit",
    label: "Reddit",
  },
  {
    value: "quora",
    label: "Quora",
  },
  {
    value: "weibo",
    label: "Weibo",
  },
  {
    value: "wechat",
    label: "WeChat",
  },
  {
    value: "github",
    label: "Github",
  },
];

const itemsMedium = [
  {
    value: "post",
    label: "Contenu (Post)",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "cpc",
    label: "CPC (Coût par clic)",
  },
  {
    value: "cpl",
    label: "CPL (Coût par lead)",
  },
  {
    value: "banner",
    label: "Bannière",
  },
  {
    value: "story",
    label: "Story",
  },
  {
    value: "profile",
    label: "Profil",
  },
  {
    value: "video",
    label: "Video",
  },
  {
    value: "click",
    label: "Click",
  },
];
</script>
