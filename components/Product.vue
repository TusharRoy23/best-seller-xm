<template>
    <div class="card product-item border-0 mb-4">
        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img class="img-fluid w-100" :src="product?.images ? product?.images[0] : '/img/no-image.jpg'" alt="">
        </div>
        <!-- <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <NuxtImg class="img-fluid w-100" :src="product?.images?.[0] || '/img/no-image.jpg'" alt="Product Image"
                provider="cloudinary" format="webp" placeholder />
        </div> -->
        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 class="text-truncate mb-3">{{ product?.name?.dk }}</h6>
            <div class="d-flex justify-content-center">
                <h6>${{ product?.price }}</h6>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between bg-light border">
            <NuxtLink :to="'/product-details/' + product?.id">
                <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>
                    View Detail
                </a>
            </NuxtLink>
            <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { Product } from '~/utils/customTypes';
defineProps<{
    product?: Product
}>();
</script>