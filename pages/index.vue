<template>
  <NuxtLayout name="landing">
    <div v-track-pageview class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div
          class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
        >
          <svg
            class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                class="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div
                  class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"
                >
                  <div
                    class="flex items-center justify-between w-full md:w-auto"
                  >
                    <a href="/">
                      <span class="sr-only">Atrap.io</span>
                      <img class="h-8 w-auto sm:h-10" src="/logo.png" />
                    </a>
                    <div class="-mr-2 flex items-center md:hidden">
                      <PopoverButton
                        class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span class="sr-only">Ouvrir le menu principal</span>
                        <MenuIcon class="h-6 w-6" aria-hidden="true" />
                      </PopoverButton>
                    </div>
                  </div>
                </div>
                <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  <template v-for="item in navigation" :key="item.name">
                    <NuxtLink
                      v-if="!item.href.includes('#')"
                      :to="item.href"
                      class="font-medium text-gray-500 hover:text-gray-900"
                      >{{ item.name }}</NuxtLink
                    >

                    <a
                      v-if="item.href.includes('#')"
                      @click.prevent="scrollToElement(item.href)"
                      :href="item.href"
                      class="font-medium text-gray-500 hover:text-gray-900"
                      >{{ item.name }}</a
                    >
                  </template>
                  <NuxtLink
                    v-if="isAuthenticated"
                    :to="{
                      name: 'adminer',
                    }"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                    >Mes projets</NuxtLink
                  >
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
                class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div
                  class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                >
                  <div class="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img class="h-8 w-auto" src="/logo.png" alt="" />
                    </div>
                    <div class="-mr-2">
                      <PopoverButton
                        class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span class="sr-only">Fermer</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                      </PopoverButton>
                    </div>
                  </div>
                  <div class="px-2 pt-2 pb-3 space-y-1">
                    <a
                      v-for="item in navigation"
                      :key="item.name"
                      :href="item.href"
                      class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >{{ item.name }}</a
                    >
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

          <main
            class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
          >
            <div class="sm:text-center lg:text-left">
              <h1
                class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span class="block xl:inline"
                  >Construisez votre machine à prospects</span
                >
                {{ " " }}
                <span class="block text-indigo-600 xl:inline"
                  >grâce aux réseaux sociaux</span
                >
              </h1>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                Créateurs de contenus, community manager ou un spécialiste du
                marketing numérique, vous passez probablement déjà beaucoup de
                temps sur les médias sociaux.
              </p>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                Mais saviez-vous qu'il est possible d'automatiser 100% de votre
                prospection sociale.
              </p>
              <div
                class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
              >
                <div class="rounded-md shadow">
                  <a
                    @click.prevent="scrollToElement('#getting-started')"
                    href="#"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Commencer maintenant
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
    </div>

    <div id="getting-started" class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2
            class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            Gardez le contrôle.
          </h2>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Ce n'est pas parce que l'on automatise la publication de contenu
            qu'on ne peut pas mettre en place une prospection de qualité.
          </p>
        </div>
      </div>
    </div>

    <div class="relative bg-white">
      <div class="lg:absolute lg:inset-0">
        <div class="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
          <img
            class="h-56 w-full object-cover lg:absolute lg:h-full"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
            alt=""
          />
        </div>
      </div>
      <div
        class="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2"
      >
        <div class="lg:col-start-2 lg:pl-8">
          <div
            class="text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0"
          >
            <h2
              class="leading-6 text-indigo-600 font-semibold tracking-wide uppercase"
            >
              Présentation
            </h2>
            <h3
              class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Comment ça fonctionne ?
            </h3>
            <p class="mt-8 text-lg text-gray-500">
              Passez-vous beaucoup de temps créer et programmer vos publications
              sur les réseaux sociaux ?
            </p>
            <div class="mt-5 prose prose-indigo text-gray-500">
              <p>
                Si oui, alors vous cherchez probablement un moyen de
                l'automatiser.
              </p>
              <p>
                Avec Atrap.io, on vous donne les outils nécessaire pour créer du
                contenu facilement.
              </p>
              <p>
                Nous nous occupons de le diffuser sur les réseaux sociaux de
                votre choix.
              </p>
              <p>
                Vous restez maître du contenu que vous publiez sur les réseaux
                sociaux.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative py-32 bg-white overflow-hidden">
      <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          class="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        >
          <svg
            class="absolute top-12 left-full transform translate-x-32"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
        </div>
      </div>
      <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto">
          <h1>
            <span
              class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase"
            >
              Visibilité
            </span>
            <span
              class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Optimisez votre visibilité
            </span>
          </h1>
          <p class="mt-8 text-xl text-gray-500 leading-8">
            Atrap.io est un outil puissant que nous déployons progressivement.
            Mais vous pouvez vous enregistrer gratuitement à la liste d'attente.
          </p>
        </div>
        <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <p>
            Il vous permet de programmer, suivre et optimiser votre production
            de contenu pour les réseaux sociaux !
          </p>
          <p>
            Pourquoi ne pas réserver votre place pour être le premier à booster
            votre visibilité.
          </p>
          <p>
            Vous pourrez bénéficier de fonctionnalités puissantes comme
            l'automatisation vos contenus sur les réseaux sociaux ainsi que le
            suivi de vos performances.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-indigo-700">
      <div
        class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8"
      >
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Améliorez votre visibilité.</span>
          <span class="block">Boostez votre business.</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-indigo-200">
          Réservez votre place pour être le premier à booster votre visibilité
          et prospection sociale en automatique.
        </p>
        <a
          @click.prevent="scrollToElement('#register')"
          href="#register"
          class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
        >
          Commencer maintenant
        </a>
      </div>
    </div>

    <div class="relative py-32 bg-white overflow-hidden">
      <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto">
          <h1>
            <span
              class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase"
            >
              Business
            </span>
            <span
              class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Automatisez votre prospection
            </span>
          </h1>
          <p class="mt-8 text-xl text-gray-500 leading-8">
            Atrap.io est un outil qui vous permet d'automatiser votre
            prospection sociale afin d'amener les prospects dans vos tunnels de
            vente efficacement.
          </p>
        </div>
        <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <p>
            Développez votre business avec un marketing de contenu varié que
            vous allez pouvoir créer en une fraction de seconde.
          </p>
          <p>Ne laissez plus jamais vos réseaux sociaux vides.</p>
          <p>
            N'ayez plus besoin de vous connecter tous les jours pour créer du
            contenu varier régulièrement.
          </p>
        </div>
      </div>
    </div>

    <div id="register" class="bg-white py-16 sm:py-24">
      <div class="relative sm:py-16">
        <div aria-hidden="true" class="hidden sm:block">
          <div
            class="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl"
          />
          <svg
            class="absolute top-8 left-1/2 -ml-3"
            width="404"
            height="392"
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="392"
              fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
            />
          </svg>
        </div>
        <div
          class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div
            class="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20"
          >
            <div
              aria-hidden="true"
              class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                class="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  class="text-indigo-500 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  class="text-indigo-700 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div class="relative">
              <div class="sm:text-center">
                <h2
                  class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl"
                >
                  Rejoignez la liste d'attente
                </h2>
                <p class="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                  L'accès est limité à un petit groupe de testeurs.
                  Inscrivez-vous dès aujourd'hui pour avoir la chance de
                  l'essayer et de nous aider à nous améliorer.
                </p>
              </div>
              <form
                @submit.prevent="onSubmit"
                class="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
              >
                <div class="min-w-0 flex-1">
                  <label for="cta-email" class="sr-only"
                    >Entrez votre e-mail principal</label
                  >
                  <input
                    @blur="onEmailBlur"
                    @focus="onEmailFocus"
                    v-model="email"
                    id="cta-email"
                    type="email"
                    class="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    placeholder="Entrez votre e-mail principal"
                  />
                  <p v-if="emailError" class="mt-2 text-white" id="email-error">
                    Merci de saisir une adresse e-mail valide.
                  </p>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    :disabled="
                      isLoading || emailError || !isStarted ? 'disabled' : null
                    "
                    type="submit"
                    :class="`block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10 ${
                      isLoading || emailError || !isStarted
                        ? 'opacity-50 hover:bg-indigo-500'
                        : ''
                    }`"
                  >
                    M'inscrire
                  </button>
                </div>
              </form>
              <p
                v-if="isLoading"
                class="mt-6 mx-auto max-w-2xl text-lg text-indigo-200 text-center italic"
              >
                Merci de patienter, nous traitons votre demande...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline/index.js";
import * as yup from "yup";
const schema = yup.object().shape({
  email: yup.string().email().required(),
});
const navigation = [
  { name: "Présentation", href: "#getting-started" },
  { name: "S'inscrire", href: "#register" },
  { name: "UTM Generateur", href: "/generator/utm" },
];
const { isAuthenticated, isLogin } = useLogin();
const { onSuccess } = useNotification();
const {
  email,
  emailError,
  isLoading,
  isStarted,
  onEmailBlur,
  onEmailFocus,
  onSubmit,
  scrollToElement,
} = useNewsletter({ onSuccess });
onMounted(async () => await isLogin());
</script>
