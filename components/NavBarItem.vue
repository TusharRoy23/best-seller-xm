<template>
    <template v-for="( category, index ) in categories" :key="index">
        <template v-if="category.categories">
            <div class="nav-item dropdown">
                <a href="#" class="nav-link" data-toggle="collapse" :data-target="'#collapse'+category.id">{{ category.name.en }} <i
                                    class="fa fa-angle-down float-right mt-1"></i></a>
                    <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0" :id="'collapse'+category.id">
                        <template v-for="(subcat) in category.categories">
                            <template v-if="subcat.categories">
                                    <NavBarItem :categories="subcat.categories" />
                                </template>
                                <template v-else>
                                    <a href="#" class="nav-item nav-link" >{{ subcat.name.en }}</a>
                                </template>
                        </template>
                    </div>
            </div>
        </template>
        <template v-else>
            <a href="#" class="nav-item nav-link">
                {{ category.name.en }}
            </a>
        </template>
    </template>
</template>
<script setup lang="ts">
    import type { Category } from "~/utils/customTypes";
    defineProps<{
        categories: Category[] | undefined
    }>();
</script>