<template>
  <div>
    <SimpleNotif
      :show="paramsNotif.show"
      :title="paramsNotif.title"
      :subtitle="paramsNotif.subtitle"
      :timeout="5000"
      :type="paramsNotif.type"
    />

    <SettingsTabHeading>
      <template v-slot:title> Connexion social </template>
      <template v-slot:description>
        Connectez votre projet à des réseaux sociaux
      </template>
    </SettingsTabHeading>

    <div class="mt-6">
      <dl class="divide-y divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-500 grid content-center">
            Associer un compte Twitter
          </dt>
          <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span class="flex-grow">
              <button
                :disabled="isTwitterLoading"
                @click="onTwitterConnect"
                type="button"
                :class="`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-twitter-blue-500 bg-twitter-blue-500 hover:bg-twitter-blue-600 ${
                  isTwitterLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`"
              >
                <svg
                  class="w-5 h-5 pr-2"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
                Connecter Twitter
              </button>
            </span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
const socialConnectCookie = useCookie<{
  twitterToker: string;
  redirectUrl: string;
}>("social-connect", {
  maxAge: 60 * 60 * 24 * 365,
  path: "/",
});

const router = useRouter();
const route = useRoute();

const isTwitterLoading = ref(false);

const { $fire } = useNuxtApp();

const { SITE_URL } = useRuntimeConfig();

const paramsNotif = ref({
  show: false,
  title: "",
  subtitle: "",
});

const onTwitterConnect = async () => {
  isTwitterLoading.value = true;

  paramsNotif.value = {
    show: true,
    title: "Connexion en cours...",
    subtitle: "Merci de patienter. Nous vous connectons à Twitter.",
  };

  const { data } = await useFetch(`${SITE_URL}/api/social/twitter/connect`);

  const { url, oauth_token } = data.value;

  socialConnectCookie.value = {
    twitterToken: oauth_token,
    redirectSocialUrl: `${SITE_URL}${route.fullPath}`,
  };

  window.location.href = url;
};

const redirectAfterSave = () => {
  const hash = route.hash;
  router.push({
    query: {},
    hash,
  });
};

await onMounted(async () => {
  const {
    accessSecret,
    accessToken,
    name,
    profile_image_url,
    screenName,
    userId,
  } = route.query;

  const { projectid } = route.params;

  const { auth, firestore } = $fire;

  const socialConnectRepository = useSocialConnectRepository({
    auth,
    firestore,
  });

  try {
    await socialConnectRepository.setTwitterConnect({
      accessSecret,
      accessToken,
      name,
      profileImageUrl: profile_image_url,
      screenName,
      userId,
      projectId: projectid,
    });

    console.log("Twitter connect success");

    redirectAfterSave();
  } catch (error) {}
});
</script>
