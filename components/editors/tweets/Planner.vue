<template>
  <div class="text-left sm:w-full">
    <div>
      <div
        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
      >
        <ClockIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
      </div>
      <div class="mt-3 text-center sm:mt-5 mb-5">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Confirmation de publication
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Vous êtes sur le point de publier
            <strong
              >{{ props.possibilities }} tweet{{
                props.possibilities > 1 ? "s" : ""
              }}</strong
            >.
          </p>

          <p class="text-sm text-gray-500">
            Pour finaliser votre publication veuillez définir une période de
            publication afin que nous répartitions vos contenus sur la durée.
          </p>
        </div>
      </div>
      <Datepicker v-model="date" range :minDate="new Date()" />
    </div>
    <div
      class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
    >
      <button
        @click="$emit('onSend')"
        :disabled="!isValid"
        type="button"
        :class="`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm ${
          !isValid ? 'opacity-50 cursor-not-allowed' : ''
        }`"
      >
        Plannifier
      </button>
      <button
        @click="$emit('onCancel')"
        type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
        ref="cancelButtonRef"
      >
        Annuler
      </button>
    </div>
  </div>
</template>

<script setup>
import { ClockIcon } from "@heroicons/vue/solid/index.js";

const props = defineProps({
  possibilities: {
    type: Number,
    default: 0,
  },
  date: {
    type: Object,
    default: null,
  },
});

const isValid = ref(false);

const emits = defineEmits(["onCanel", "onSend", "update:date"]);

const date = computed({
  get() {
    return props.date;
  },
  set(value) {
    value.filter((date) => date !== null).length === 2 &&
      (isValid.value = true);

    emits("update:date", value);
  },
});
</script>
