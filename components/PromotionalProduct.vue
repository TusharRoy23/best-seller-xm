<template>
    <div :class="containerClass">
        <img class="w-100" :src="imageUrl" :alt="altText" />
    </div>
</template>
<script lang="ts" setup>
import type { PromotionalSpots } from '~/utils/customTypes';
const props = defineProps<{
    promotionalSpot?: PromotionalSpots
}>();

const imageUrl = computed(() => props.promotionalSpot?.image.imageUrl || '/img/no-image.jpg');
const altText = computed(() => props.promotionalSpot?.image.alt || 'No image available');

const containerClass = computed(() => {
  switch (props.promotionalSpot?.type) {
    case '1x1': return 'col-lg-4 col-md-6 col-sm-12 pb-1 border-0 mb-4';
    case '2x2': return 'col-md-6 pb-4 mb-2 px-5';
    default: return 'col-md-12 pb-4';
  }
});
</script>