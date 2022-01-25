<template>
  <div>
    <form @submit.prevent="action">
      <div class="space-y-6">
        <div>
          <h1 class="text-lg leading-6 font-medium text-gray-900">
            Project Settings
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Let’s get started by filling in the information below to create your
            new project.
          </p>
        </div>

        <InputText
          v-model="projectName"
          inputName="project-name"
          inputLabel="Nom du projet"
          errorMessage="Merci de saisir un nom de projet (e.g. Mon site web)."
          helpMessage="Saisissez un nom de projet (e.g. Mon site web)."
          v-model:inputError="nameError"
        />

        <InputTextarea
          v-model="projectDescription"
          inputName="project-description"
          inputLabel="Description du projet"
          errorMessage="Merci de saisir une description (e.g. Mise en place d'une campagne de visibilité)."
          helpMessage="Saisissez une description (e.g. Mise en place d'une campagne de visibilité)."
          v-model:inputError="descriptionError"
        />

        <div class="flex justify-end">
          <button
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Créer
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import slugify from "slugify";
import * as yup from "yup";

const schema = yup.object().shape({
  projectName: yup.string().required("name_field"),
  projectDescription: yup.string().required("description_field"),
});

const props = defineProps(["modelValue"]);

const nameError = ref(false);
const descriptionError = ref(false);

const emit = defineEmits(["update:modelValue", "onSubmit"]);

const projectName = computed({
  get() {
    return props.modelValue.projectName;
  },
  set(val: string) {
    props.modelValue.projectName = val;
    props.modelValue.projectSlug = slugify(val.toLowerCase());

    emit("update:modelValue", props.modelValue);
  },
});

const projectDescription = computed({
  get() {
    return props.modelValue.projectDescription;
  },
  set(val) {
    props.modelValue.projectDescription = val;

    emit("update:modelValue", props.modelValue);
  },
});

const action = async () => {
  nameError.value = false;
  descriptionError.value = false;

  try {
    schema.validateSync(
      {
        projectName: props.modelValue.projectName,
        projectDescription: props.modelValue.projectDescription,
      },
      { abortEarly: false }
    );

    emit("onSubmit");
  } catch (error) {
    error.errors.forEach((error) => {
      if (error === "name_field") {
        nameError.value = true;
      }

      if (error === "description_field") {
        descriptionError.value = true;
      }
    });
  }
};
</script>
