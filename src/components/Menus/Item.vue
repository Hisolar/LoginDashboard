<template>
  <li class="px-4 py-2 hover:bg-red-50" :class="is_active ? 'bg-red-200' : ''">
    <slot />
  </li>
</template>

<script setup>
const props = defineProps({
  is_active: {
    default: false,
    type: Boolean,
  },
});
</script>
