<template>
    <div class="card product-item border-0 mb-4">
        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <NuxtImg class="img-fluid w-100" :src="product?.images ? product?.images[0] : '/img/no-image.jpg'" alt="Product Image"
                 placeholder quality="30" />
        </div>
        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 class="text-truncate mb-3">
                  {{ useLocalizedName(product, 'name') }}
            </h6>
            <div class="d-flex justify-content-center">
                <h6>${{ product?.price }}</h6>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-center bg-light border">
            <NuxtLink :to="'/product-details/' + product?.id" class="btn btn-sm text-dark p-0">
                <i class="fas fa-eye text-primary mr-1"></i>
                View Detail
            </NuxtLink>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useLocalizedName } from '~/helper/helper';
import type { Product } from '~/utils/customTypes';
defineProps<{
    product?: Product
}>();
</script>