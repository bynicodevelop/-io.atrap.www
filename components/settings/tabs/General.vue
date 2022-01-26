<template>
  <div>
    <!-- Description list with inline editing -->
    <SettingsTabHeading>
      <template v-slot:title>
        Projet
        <small class="italic text-xs text-gray-500"
          >({{ props.modelValue.id }})</small
        >
      </template>
      <template v-slot:description>
        Information principales sur votre projet
      </template>
    </SettingsTabHeading>

    <div class="mt-6">
      <dl class="divide-y divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-500 grid content-center">
            Nom
          </dt>
          <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span v-if="!projectNameEdited" class="flex-grow">{{ name }}</span>
            <span v-if="projectNameEdited" class="flex-grow">
              <InputText v-model="name" inputName="projectName" />
            </span>
            <span class="ml-4 flex-shrink-0 grid content-center">
              <button
                @click="projectNameEdited = !projectNameEdited"
                type="button"
                class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {{ projectNameEdited ? "Enregistrer" : "Éditer" }}
              </button>
            </span>
          </dd>
        </div>

        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-500 grid content-center">
            Description
          </dt>
          <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span v-if="!projectDescriptionEdited" class="flex-grow">{{
              description
            }}</span>
            <span v-if="projectDescriptionEdited" class="flex-grow">
              <InputTextarea
                v-model="description"
                inputName="projectDescription"
              />
            </span>
            <span class="ml-4 flex-shrink-0 grid content-center">
              <button
                @click="projectDescriptionEdited = !projectDescriptionEdited"
                type="button"
                class="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {{ projectDescriptionEdited ? "Enregistrer" : "Éditer" }}
              </button>
            </span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    required: true,
  },
});

const emits = defineEmits(["update:modelValue", "onUpdate"]);

const projectNameEdited = ref(false);
const projectDescriptionEdited = ref(false);

const name = computed({
  get() {
    return props.modelValue.name;
  },
  set(value) {
    props.modelValue.name = value;

    emits("update:modelValue", props.modelValue);
  },
});

const description = computed({
  get() {
    return props.modelValue.description;
  },
  set(value) {
    props.modelValue.description = value;

    emits("update:modelValue", props.modelValue);
  },
});

watch(projectNameEdited, async (value) => {
  if (!value) {
    emits("onUpdate");
  }
});

watch(projectDescriptionEdited, async (value) => {
  if (!value) {
    emits("onUpdate");
  }
});
</script>
