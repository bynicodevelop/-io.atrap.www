<template>
  <div>
    <label
      for="project-name"
      :class="`block text-sm font-medium text-gray-700 ${
        props.inputError ? 'text-red-600' : ''
      }`"
    >
      {{ props.inputLabel }}
    </label>
    <div class="mt-1">
      <input
        @focus="onFocus"
        @blur="onBlur"
        v-model="valueModel"
        type="text"
        name="project-name"
        id="project-name"
        :class="`block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md ${
          props.inputError ? 'border-red-300 text-red-900' : ''
        }`"
      />
      <p
        v-if="!props.inputError && props.helpMessage"
        class="mt-2 text-sm text-gray-500"
      >
        {{ props.helpMessage }}
      </p>
      <p v-if="props.inputError" class="mt-2 text-sm text-red-600">
        {{ props.errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  inputError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  helpMessage: {
    type: String,
    default: "",
  },
  inputLabel: {
    type: String,
    default: "",
  },
});

const isStated = ref(false);

const emits = defineEmits(["update:modelValue", "update:inputError"]);

const valueModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

const onBlur = () => {
  emits("update:inputError", false);
};

const onFocus = () => {
  isStated.value = true;

  emits("update:inputError", false);
};
</script>
