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
              <SocialButtonTwitter
                :connectorIsset="hasTwitterConnector"
                @onTwitterConnect="onTwitterConnect"
              />
            </span>
            <span
              v-if="hasTwitterConnector"
              class="ml-4 flex-shrink-0 grid content-center"
            >
              <button
                @click="onRevokeConnector('twitter')"
                type="button"
                class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Révoquer la connexion
              </button>
            </span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const { $fire } = useNuxtApp();

const hasTwitterConnector = ref(false);

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const paramsNotif = ref({
  show: false,
  title: "",
  subtitle: "",
});

const onTwitterConnect = (): void => {
  paramsNotif.value = {
    show: true,
    title: "Connexion en cours...",
    subtitle: "Merci de patienter. Nous vous connectons à Twitter.",
  };
};

const redirectAfterSave = () => {
  const hash = route.hash;
  router.push({
    query: {},
    hash,
  });
};

watch(
  () => props.modelValue,
  (value) => {
    const { connectors } = value;

    for (const connector of connectors) {
      if (connector.id === "twitter") {
        hasTwitterConnector.value = true;
      }
    }
  }
);

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

    hasTwitterConnector.value = true;
  } catch (error) {
    console.log(error);
  }
});

const onRevokeConnector = async (connectorName: string) => {
  const { projectid } = route.params;

  const { auth, firestore } = $fire;

  const socialConnectRepository = useSocialConnectRepository({
    auth,
    firestore,
  });

  if (connectorName === "twitter") {
    await socialConnectRepository.revokeTwitterConnect(projectid);

    hasTwitterConnector.value = false;
  }
};
</script>
