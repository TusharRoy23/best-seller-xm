<template>
    <template v-for="(category, index) in categories" :key="index">
        <!-- If the category has subcategories, show dropdown -->
        <div class="nav-item dropdown" v-if="category.categories">
            <div class="nav-link d-flex justify-content-between align-items-center">
                <!-- Clicking the name navigates -->
                <NuxtLink :to="searchByCategory(category)">
                    {{ useLocalizedName(category, 'name') }}
                </NuxtLink>

                <!-- Clicking the icon toggles dropdown -->
                <i 
                    :class="{'fa fa-angle-down': expandedCategory !== category.id, 'fa fa-angle-up': expandedCategory === category.id}" 
                    class="cursor-pointer"
                    @click.stop="toggleCategory(category.id)"
                ></i>
            </div>

            <div 
                class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0"
                :class="{ 'show': expandedCategory === category.id }"
            >
                <template v-for="subcat in category.categories" :key="subcat.id">
                    <NavBarItem :categories="subcat.categories" v-if="subcat.categories" />
                    <NuxtLink :to="searchByCategory(subcat)" class="nav-item nav-link" v-else>
                        {{ useLocalizedName(subcat, 'name') }}
                    </NuxtLink>
                </template>
            </div>
        </div>

        <!-- If no subcategories, show a direct link -->
        <NuxtLink class="nav-item nav-link" :to="searchByCategory(category)" v-else>
            {{ useLocalizedName(category, 'name') }}
        </NuxtLink>
    </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLocalizedName } from "~/helper/helper";
import type { Category } from "~/utils/customTypes";

defineProps<{ categories: Category[] | undefined }>();

const expandedCategory = ref<string | null>(null);

const toggleCategory = (id: string) => {
    expandedCategory.value = expandedCategory.value === id ? null : id;
};

const searchByCategory = (category: Category) => ({
    path: '/',
    query: { category: category.id }
});
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
