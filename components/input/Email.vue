<template>
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">
      Votre email
    </label>
    <div class="mt-1">
      <input
        @blur="onEmailBlur"
        @focus="onEmailFocus"
        v-model="email"
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required=""
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <p v-if="emailError" class="mt-2 text-red-500" id="email-error">
        Merci de saisir une adresse e-mail valide.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const email = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const emailError = ref(false);

const isStarted = ref(false);

const onEmailBlur = async () => {
  emailError.value = false;

  try {
    await schema.validate({ email: email.value });
  } catch (e) {
    emailError.value = true;
  }
};

const onEmailFocus = () => {
  isStarted.value = true;
  emailError.value = false;
};
</script>
