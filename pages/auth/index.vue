<template>
  <div class="min-h-full flex">
    <Notification />

    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <NuxtLink to="/">
            <img class="h-12 w-auto" src="/logo.png" alt="Atrap.io" />
          </NuxtLink>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Connectez-vous à votre compte
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Ou
            {{ " " }}
            <NuxtLink
              to="/auth/register"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              créer un compte.
            </NuxtLink>
          </p>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form @submit.prevent="onSubmit" method="POST" class="space-y-6">
              <InputText
                v-model="email"
                inputType="email"
                inputLabel="Votre email principal"
                errorMessage="Merci de saisir une adresse email valide (e.g. john.doe@domain.tld)."
                inputName="email"
                v-model:inputError="emailError"
              />

              <InputText
                v-model="password"
                inputType="password"
                inputLabel="Entrez votre mot de passe"
                errorMessage="Merci de saisir mot de passe valide (au moins 6 caractères)."
                inputName="password"
                v-model:inputError="passwordError"
              />

              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
const { SITE_NAME } = useRuntimeConfig();

definePageMeta({
  layout: "",
});

const siteName = SITE_NAME;
const title = `Connexion - ${siteName}`;

useMeta({
  title,
  bodyAttrs: {
    class: "h-full",
  },
  htmlAttrs: {
    class: "h-full bg-white",
  },
});

const { email, emailError, password, passwordError, onSubmit } = useLogin();

onMounted(() => {
  email.value =
    window.location.hostname === "localhost" ? "john@domain.tld" : "";

  password.value = window.location.hostname === "localhost" ? "123456" : "";
});
</script>

<style lang="css">
div#__nuxt,
#__layout,
#__layout > div,
#app {
  height: 100vh !important;
}
</style>
