<template>
  <div>
    <button
      :disabled="isTwitterLoading || props.connectorIsset"
      @click="onTwitterConnect"
      type="button"
      :class="`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-twitter-blue-500 bg-twitter-blue-500 hover:bg-twitter-blue-600 ${
        isTwitterLoading || props.connectorIsset
          ? 'opacity-50 cursor-not-allowed'
          : ''
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
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  connectorIsset: {
    type: Boolean,
    default: false,
  },
});

const socialConnectCookie = useCookie<{
  twitterToker: string;
  redirectUrl: string;
}>("social-connect", {
  maxAge: 60 * 60 * 24 * 365,
  path: "/",
});

const { SITE_URL } = useRuntimeConfig();

const route = useRoute();

const emits = defineEmits(["onTwitterConnect"]);

const isTwitterLoading = ref(false);

const onTwitterConnect = async (): Promise<void> => {
  isTwitterLoading.value = true;

  emits("onTwitterConnect");

  const { data } = await useFetch(`${SITE_URL}/api/social/twitter/connect`);

  const { url, oauth_token } = data.value;

  socialConnectCookie.value = {
    twitterToken: oauth_token,
    redirectSocialUrl: `${SITE_URL}${route.fullPath}`,
  };

  window.location.href = url;
};
</script>
