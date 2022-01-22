<template>
  <div class="bg-white">
    <SimpleNotif
      :show="paramsNotif.show"
      :title="paramsNotif.title"
      :subtitle="paramsNotif.subtitle"
    />

    <Popover as="header" class="relative">
      <div class="bg-warm-gray-50">
        <nav
          class="relative max-w-7xl mx-auto flex items-center justify-between pt-6 px-6 xl:px-8"
          aria-label="Global"
        >
          <div class="flex items-center flex-1">
            <div class="flex items-center justify-between w-full lg:w-auto">
              <NuxtLink to="/">
                <span class="sr-only">Atrap.io</span>
                <img class="h-8 w-auto sm:h-10" src="/logo.png" alt="" />
              </NuxtLink>
              <div class="-mr-2 flex items-center lg:hidden">
                <PopoverButton
                  :class="`bg-warm-gray-50 rounded-md p-2 inline-flex items-center justify-center text-warm-gray-400 hover:bg-warm-gray-100 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-indigo-500 ${
                    navigation.length > 0 ? '' : 'hidden'
                  }`"
                >
                  <span class="sr-only">Ouvrir le menu</span>
                  <MenuIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="hidden space-x-10 lg:flex lg:ml-10">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="text-base font-medium text-warm-gray-500 hover:text-warm-gray-900"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </nav>
      </div>

      <transition
        enter-active-class="duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <PopoverPanel
          focus
          class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top lg:hidden"
        >
          <div
            class="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <div class="px-5 pt-4 flex items-center justify-between">
              <div>
                <img class="h-8 w-auto" src="/logo.png" alt="Atrap.io" />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  :class="`bg-white rounded-md p-2 inline-flex items-center justify-center text-warm-gray-400 hover:bg-warm-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ${
                    navigation.length > 0 ? '' : 'hidden'
                  }`"
                >
                  <span class="sr-only">Fermer le menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="pt-5 pb-6">
              <div class="px-2 space-y-1">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="block px-3 py-2 rounded-md text-base font-medium text-warm-gray-900 hover:bg-warm-gray-50"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

    <main class="overflow-hidden">
      <!-- Header -->
      <div class="bg-warm-gray-50">
        <div class="pt-20">
          <div
            class="relative z-10 max-w-7xl mx-auto pl-4 pr-8 sm:px-6 lg:px-8"
          >
            <h1
              class="text-4xl font-extrabold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-6xl"
            >
              UTM Generateur
            </h1>
            <p class="mt-6 text-xl text-warm-gray-500 max-w-3xl">
              Générez vos URLs de tracking facilement et rapidement pour suivre
              vos visiteurs sur votre site Web.
            </p>
            <p class="mt-6 text-md text-warm-gray-500 max-w-3xl">
              Les paramètres de votre URL vous permettront de catégoriser vos
              visiteurs dans votre outil de suivi de trafic (e.g. Google
              Analytics).
            </p>
            <p class="mt-6 text-sm text-warm-gray-500 max-w-3xl italic">
              Les champs content un astérisque (*) sont obligatoires pour le bon
              fonctionnement de votre suivi de trafic.
            </p>
            <div class="h-32"></div>
          </div>
        </div>
      </div>

      <!-- Contact section -->
      <section class="relative mb-8 -mt-16" aria-labelledby="contact-heading">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative bg-white shadow-xl rounded-md">
            <form class="space-y-8 pb-8">
              <div class="space-y-8 sm:space-y-5">
                <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div class="space-y-6 sm:space-y-5">
                    <div
                      class="grid sm:grid-cols-6 sm:gap-4 sm:pt-5 px-2 sm:px-8"
                    >
                      <div class="sm:col-start-2 sm:col-span-4">
                        <div class="flex justify-between">
                          <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Url<sup>*</sup></label
                          >
                        </div>
                        <div class="mt-1">
                          <input
                            v-model="url"
                            placeholder="Saississez votre url"
                            type="text"
                            name="url"
                            id="url"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <p
                          class="mt-2 text-sm text-gray-500"
                          id="email-description"
                        >
                          Saisissez une url du type :
                          <strong>https://www.exemple.com</strong>
                        </p>
                      </div>
                    </div>

                    <div
                      class="grid sm:grid-cols-6 sm:gap-4 sm:pt-5 px-2 sm:px-8 sm:items-start sm:border-t sm:border-gray-200"
                    >
                      <div class="sm:col-start-2 sm:col-span-4">
                        <div class="flex justify-between">
                          <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Source<sup>*</sup></label
                          >
                        </div>
                        <div class="mt-1">
                          <select
                            v-model="utmSourceValue"
                            id="utmSourceValue"
                            name="utmSourceValue"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option
                              v-for="(item, index) in utmSource"
                              :key="index"
                            >
                              {{ item }}
                            </option>
                          </select>
                        </div>
                        <p
                          class="mt-2 text-sm text-gray-500"
                          id="email-description"
                        >
                          Selectionnez la provenance de votre trafic (e.g.
                          facebook, twitter...).
                        </p>
                      </div>
                    </div>

                    <div
                      class="grid sm:grid-cols-6 sm:gap-4 sm:pt-5 px-2 sm:px-8 sm:items-start sm:border-t sm:border-gray-200"
                    >
                      <div class="sm:col-start-2 sm:col-span-4">
                        <div class="flex justify-between">
                          <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Medium<sup>*</sup></label
                          >
                        </div>
                        <div class="mt-1">
                          <select
                            v-model="utmMediumValue"
                            id="utmMediumValue"
                            name="utmMediumValue"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option
                              v-for="(item, index) in utmMedium"
                              :key="index"
                            >
                              {{ item }}
                            </option>
                          </select>
                        </div>
                        <p
                          class="mt-2 text-sm text-gray-500"
                          id="email-description"
                        >
                          Selectionnez le type de trafic (e.g. email, cpc...).
                        </p>
                      </div>
                    </div>

                    <div
                      class="grid sm:grid-cols-6 sm:gap-4 sm:pt-5 px-2 sm:px-8 sm:items-start sm:border-t sm:border-gray-200"
                    >
                      <div class="sm:col-start-2 sm:col-span-4">
                        <div class="flex justify-between">
                          <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Campagne<sup>*</sup></label
                          >
                        </div>
                        <div class="mt-1">
                          <input
                            v-model="utmCampaignValue"
                            placeholder="Saississez un nom de campagne"
                            type="text"
                            name="utmCampaignValue"
                            id="utmCampaignValue"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <p
                          class="mt-2 text-sm text-gray-500"
                          id="email-description"
                        >
                          Saisissez le type de campagne (e.g. promo,
                          affiliation...).
                        </p>
                      </div>
                    </div>

                    <div
                      class="grid sm:grid-cols-6 sm:gap-4 sm:pt-5 px-2 sm:px-8 sm:items-start sm:border-t sm:border-gray-200"
                    >
                      <div class="sm:col-start-2 sm:col-span-4">
                        <div class="flex justify-between">
                          <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Saississez un identifiant</label
                          >
                          <span
                            class="text-sm text-gray-500"
                            id="email-optional"
                            >Optional</span
                          >
                        </div>
                        <div class="mt-1">
                          <input
                            v-model="utmIdValue"
                            placeholder="Saississez un identifiant"
                            type="text"
                            name="utmIdValue"
                            id="utmIdValue"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <p
                          class="mt-2 text-sm text-gray-500"
                          id="email-description"
                        >
                          Saisissez un identifiant à votre campagne (e.g. code
                          promo, titre, slogan...).
                        </p>
                      </div>
                    </div>

                    <div
                      class="grid sm:grid-cols-6 sm:gap-4 sm:pt-5 px-2 sm:px-8 sm:items-start sm:border-t sm:border-gray-200"
                    >
                      <div class="sm:col-start-2 sm:col-span-4">
                        <div class="flex justify-between">
                          <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Saississez un identifiant</label
                          >
                        </div>
                        <div class="mt-1">
                          <textarea
                            placeholder="Votre url sera générée dans ce champ..."
                            ref="refInputValue"
                            @focus="onFocus"
                            v-model="resultValue"
                            rows="4"
                            name="resultValue"
                            id="resultValue"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div class="pt-3 flex justify-end">
                          <button
                            :disabled="resultValue.value == ''"
                            @click="onCopy"
                            type="button"
                            :class="`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                              resultValue == '' ? 'opacity-50' : ''
                            }`"
                          >
                            Copier
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import {
  MailIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
} from "@heroicons/vue/outline/index.js";

const navigation = [
  // { name: "Changelog", href: "#" }
];

const utmSource = [
  "facebook",
  "twitter",
  "instagram",
  "linkedin",
  "newsletter",
  "youtube",
  "github",
];

const utmMedium = [
  "post",
  "cpc",
  "email",
  "banner",
  "story",
  "cpl",
  "profile",
  "video",
  "click",
];

const { SITE_TITLE, SITE_NAME } = useRuntimeConfig();

const siteName = SITE_NAME;
const title = `${SITE_TITLE} - ${siteName}`;

useMeta({
  title,
  description:
    "Générez vos URLs de tracking facilement et rapidement pour suivre vos visiteurs sur votre site Web.",
});

const url = ref("");
const utmSourceValue = ref("");
const utmMediumValue = ref("");
const utmCampaignValue = ref("");
const utmIdValue = ref("");
const resultValue = ref("");

const paramsNotif = reactive({
  show: false,
  title: "",
  subtitle: "",
});

const refInputValue = ref(null);

const query = ref({});

watch(url, (value) => {
  if (value) {
    let q = [];

    Object.keys(query.value).forEach((key) => {
      if (query.value[key]) {
        q.push(`${key}=${query.value[key]}`);
      }
    });

    if (q.length > 0) {
      resultValue.value = `${url.value}${
        url.value.includes("?") ? "&" : "?"
      }${q.join("&")}`;
    } else {
      resultValue.value = url.value;
    }
  }
});

watch(utmSourceValue, (value) => {
  if (value) {
    query.value["utm_source"] = utmSourceValue.value;

    let q = [];

    Object.keys(query.value).forEach((key) => {
      if (query.value[key]) {
        q.push(`${key}=${query.value[key]}`);
      }
    });

    if (q.length > 0) {
      resultValue.value = `${url.value}${
        url.value.includes("?") ? "&" : "?"
      }${q.join("&")}`;
    } else {
      resultValue.value = url.value;
    }
  }
});

watch(utmMediumValue, (value) => {
  if (value) {
    query.value["utm_medium"] = utmMediumValue.value;

    let q = [];

    Object.keys(query.value).forEach((key) => {
      if (query.value[key]) {
        q.push(`${key}=${query.value[key]}`);
      }
    });

    if (q.length > 0) {
      resultValue.value = `${url.value}${
        url.value.includes("?") ? "&" : "?"
      }${q.join("&")}`;
    } else {
      resultValue.value = url.value;
    }
  }
});

watch(utmCampaignValue, (value) => {
  if (value) {
    query.value["utm_campaign"] = utmCampaignValue.value;

    let q = [];

    Object.keys(query.value).forEach((key) => {
      if (query.value[key]) {
        q.push(`${key}=${query.value[key]}`);
      }
    });

    if (q.length > 0) {
      resultValue.value = `${url.value}${
        url.value.includes("?") ? "&" : "?"
      }${q.join("&")}`;
    } else {
      resultValue.value = url.value;
    }
  }
});

watch(utmIdValue, (value) => {
  if (value) {
    query.value["utm_id"] = utmIdValue.value;

    let q = [];

    Object.keys(query.value).forEach((key) => {
      if (query.value[key]) {
        q.push(`${key}=${query.value[key]}`);
      }
    });

    if (q.length > 0) {
      resultValue.value = `${url.value}${
        url.value.includes("?") ? "&" : "?"
      }${q.join("&")}`;
    } else {
      resultValue.value = url.value;
    }
  }
});

const copy = async () => {
  if (!/msie\s/i.test(window.navigator.userAgent)) {
    await navigator.clipboard.writeText(refInputValue.value.value);
  } else {
    console.log("coucouqsd");
    document.execCommand("copy");
  }

  paramsNotif.show = true;
  paramsNotif.title = "Contenu copié 💪";
  paramsNotif.subtitle =
    "Vous pouvez dès maintenant le partager dans vos contenus favoris.";
};

async function onCopy() {
  if (refInputValue.value.value == "") return;

  await copy();
}

async function onFocus() {
  paramsNotif.show = false;
  paramsNotif.title = "";
  paramsNotif.subtitle = "";

  if (refInputValue.value.value == "") return;

  refInputValue.value.select();

  await copy();
}
</script>
