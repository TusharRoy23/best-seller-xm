<template>
    <!-- Color Start -->
    <div class="border-bottom mb-4 pb-4">
        <h5 class="font-weight-semi-bold mb-4">Filter by color</h5>
        <form>
            <template v-for="(color, index) in colors" :key="index">
                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" v-model="selectedColors" :value="color.color" class="custom-control-input" :id="'color-'+index">
                    <label class="custom-control-label" :for="'color-'+index">{{ color.color }}</label>
                    <span class="badge border font-weight-normal">{{ color.count }}</span>
                </div>
            </template>
        </form>
    </div>
                <!-- Color End -->
</template>
<script setup lang="ts">
    const selectedColors = defineModel(); // Bound to parent
    defineProps<{
        colors: ColorFilter[]
    }>();
</script>