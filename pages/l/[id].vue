<template>
  <div class="h-full">
    <Html lang="fr-FR">
      <Head>
        <Title>{{ metadata.title }}</Title>
        <Meta
          v-if="metadata.description"
          name="description"
          :content="metadata.description"
        />
        <Meta
          v-if="metadata.description"
          name="og:description"
          :content="metadata.description"
        />
        <Meta
          v-if="metadata.description"
          name="twitter:description"
          :content="metadata.description"
        />
        <Meta
          v-if="metadata.image"
          property="og:image"
          :content="metadata.image"
        />
        <Meta
          v-if="metadata.image"
          property="twitter:image"
          :content="metadata.image"
        />
      </Head>
    </Html>

    <div class="min-h-full pt-16 pb-12 flex flex-col bg-white">
      <main
        class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div class="flex-shrink-0 flex justify-center">
          <a href="/" class="inline-flex">
            <span class="sr-only">Atrap.io</span>
            <img class="h-12 w-auto" src="/logo.png" alt="" />
          </a>
        </div>
        <div class="py-3">
          <div class="text-center">
            <p
              class="text-sm font-semibold text-indigo-600 uppercase tracking-wide"
            >
              Atrap.io
            </p>
            <p v-if="devMode" class="mt-2 text-sm italic text-gray-600">
              Redirection en cours...
            </p>
            <p v-if="devMode" class="mt-2 text-sm italic text-gray-600">
              Redirect to : {{ redirectLink }}
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
const { SITE_URL } = useRuntimeConfig();

const { metadata, userAgentType, onRedirect, redirectLink } = useLinks({
  SITE_URL,
});

const devMode = ref(process.env.NODE_ENV === "development");

onMounted(() => {
  onRedirect();
});

watch(redirectLink, (value) => {
  if (!devMode.value && userAgentType !== "bot") {
    window.location.href = value;
  }
});
</script>
