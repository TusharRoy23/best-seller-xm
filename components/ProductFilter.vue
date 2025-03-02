<template>
    <!-- Shop Sidebar Start -->
    <div class="col-lg-3 col-md-12">
        <ColorFilters :colors="colors" v-model="selectedColors" />
    </div>
    <!-- Shop Sidebar End -->
</template>
<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
import { useDebounceFn } from '@vueuse/core';
const { data: colors } = useFetch<ColorFilter[]>('/api/colors', { default: () => [] });

const selectedColors = ref(
  Array.isArray(route.query.colors) 
    ? route.query.colors
    : route.query.colors 
      ? route.query.colors.split(',')
      : []
);

// Debounced function to update route
const updateRoute = useDebounceFn(() => {
  router.push({
    path: '/',
    query: selectedColors.value.length ? { colors: selectedColors.value.join(',') } : {}
  });
}, 500); // 500ms debounce

// Watch selectedColors and update the route after delay
watch(selectedColors, updateRoute, { deep: true });
</script>