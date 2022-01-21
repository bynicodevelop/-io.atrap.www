<template>
  <div
    :class="`fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-40 ${
      hideCookieBanner ? 'hidden' : ''
    }`"
  >
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-indigo-800">
              <InformationCircleIcon
                class="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p class="ml-3 font-medium text-white truncate">
              <span class="md:hidden"> Information cookies ! </span>
              <span class="hidden md:inline">
                Information ! Nous utilisons des cookies pour améliorer
                l’expérience utilisateur et analyser le trafic sur notre site
                web.
              </span>
            </p>
          </div>
          <div
            class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
          >
            <a
              @click="onClick"
              href="#"
              class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Accepter
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InformationCircleIcon } from "@heroicons/vue/outline/index.js";

const cookies = <any>useCookie("__session", {
  maxAge: 60 * 60 * 24 * 365,
  path: "/",
});

const { cookieConsent = false } = cookies.value ?? {};

const hideCookieBanner = ref(cookieConsent);

const onClick = () => {
  hideCookieBanner.value = true;

  cookies.value = <any>{ ...{ cookieConsent: hideCookieBanner } };
};
</script>
