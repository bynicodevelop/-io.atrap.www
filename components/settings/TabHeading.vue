<template>
  <div>
    <div class="space-y-1">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        <slot name="title"></slot>
      </h3>
      <p class="max-w-2xl text-sm text-gray-500" v-if="$slots.description">
        <slot name="description"></slot>
      </p>
    </div>
  </div>
</template>
