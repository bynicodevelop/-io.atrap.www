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
            <SocialButtonTwitter
              :connector="twitterConnector"
              @onTwitterConnect="onTwitterConnect"
            />
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
// const router = useRouter();
// const route = useRoute();

import { isEmpty, isUndefined } from "lodash";

// const { $fire } = useNuxtApp();

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const twitterConnector = ref(null);

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

onMounted(() => {
  if (!isUndefined(props.modelValue.id) || !isEmpty(props.modelValue.id)) {
    const { connectors } = props.modelValue;

    for (const connector of connectors) {
      if (connector.id === "twitter") {
        twitterConnector.value = connector;
      }
    }
  }
});

watch(
  () => props.modelValue,
  (value) => {
    const { connectors } = value;

    for (const connector of connectors) {
      if (connector.id === "twitter") {
        twitterConnector.value = connector;
      }
    }
  }
);
</script>
