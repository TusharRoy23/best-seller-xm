<template>
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <ProductFilter/>
            <!-- Shop Product Start -->
            <div class="col-lg-9 col-md-12">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between">
                            <h3>{{ products?.length }} Products</h3>
                            <button class="btn btn-sm btn-secondary" v-if="Object.keys(route.query).length > 0"
                                @click="router.push('/')">
                                Clear Filter
                            </button>
                        </div>
                    </div>
                    <template v-for="item in productsWithPromotions">
                        <div class="col-lg-4 col-md-6 col-sm-12 pb-1" v-if="isProduct(item)">
                            <Product :product="item" :key="item.id" />
                        </div>
                        <PromotionalProduct v-else-if="isPromotionalSpot(item)" :promotionalSpot="item" />
                    </template>
                </div>
            </div>
            <!-- Shop Product End -->
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useApiFetch } from '~/helper/helper';
import type { PromotionalSpots } from '~/utils/customTypes';

const route = useRoute();
const router = useRouter();

const { data: products } = useApiFetch<Product[]>(() => {
    let query = route.query.category ? `?category=${route.query.category}` : '';
    query += route.query.colors ? `?colors=${route.query.colors}` : '';
    return `/api/products${query}`;
})

const { data: promotionalSpots,  } = useApiFetch<PromotionalSpots[]>('/api/promotional-spots');

// Merge products and promotional spots while maintaining order
const productsWithPromotions = computed(() => {
    const mergedList = [];
    const productList = products.value || [];
    // Do not include promo item if there are query params
    const spotList = Object.keys(route.query).length > 0 ? [] : (promotionalSpots.value || []);
    let productIndex = 0;
    let promoIndex = 0;

    for (let i = 0; productIndex < productList.length || promoIndex < spotList.length; i++) {
        // Check if a promotional item exists at the current position
        const promo = spotList.find(p => p.position === i);
        
        if (promo) {
            mergedList.push({ ...promo, item_type: 'promo' }); // Add promo first
            promoIndex++;
        }

        if (productIndex < productList.length) {
            mergedList.push({ ...productList[productIndex], item_type: 'product' }); // Then add product
            productIndex++;
        }
    }

    return mergedList;
});
</script>