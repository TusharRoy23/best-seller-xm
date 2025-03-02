<template>
    <!-- Shop Detail Start -->
    <div class="container-fluid py-5" v-if="product">
        <div class="row px-xl-5">
            <div class="col-lg-5 pb-5">
                <div id="product-carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner border">
                        <div class="carousel-item" :class="index === 0 ? 'active' : ''"
                            v-for="(image, index) in product?.images" :key="index">
                            <NuxtImg class="w-100 h-100" :src="image" alt="Image" placeholder />
                        </div>
                    </div>
                    <template v-if="product?.images && product?.images?.length > 1">
                        <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                            <i class="fa fa-2x fa-angle-left text-dark"></i>
                        </a>
                        <a class="carousel-control-next" href="#product-carousel" data-slide="next">
                            <i class="fa fa-2x fa-angle-right text-dark"></i>
                        </a>
                    </template>
                </div>
            </div>

            <div class="col-lg-7 pb-5">
                <h3 class="font-weight-semi-bold">
                    {{ useLocalizedName(product, 'name') }}
                </h3>
                <h3 class="font-weight-semi-bold mb-4">${{ product?.price }}</h3>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Brand:</p>
                    <span>{{ product?.brand }}</span>
                </div>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                    <form>
                        <div class="custom-control custom-radio custom-control-inline"
                            v-for="(size, index) in product?.size" :key="index">
                            <input type="radio" class="custom-control-input" :id="'size-' + index" name="size">
                            <label class="custom-control-label" :for="'size-' + index">{{ size }}</label>
                        </div>
                    </form>
                </div>
                <div class="d-flex mb-4" v-if="product?.color">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Color:</p>
                    <span>{{ product?.color }}</span>
                </div>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Stock:</p>
                    <span>{{ product?.stock }}</span>
                </div>
                <div class="d-flex mb-3" v-if="product?.variant">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Variant:</p>
                    <form>
                        <div class="custom-control custom-radio custom-control-inline"
                            v-for="(variant, index) in product?.variant" :key="index">
                            <input type="radio" class="custom-control-input" @click="onVariantSelect(variant)"
                                :id="'variant-' + index" name="variant" v-model="selectedVariant"
                                :value="variant.color">
                            <label class="custom-control-label" :for="'variant-' + index">{{ variant.color }}</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row px-xl-5">
            <div class="col">
                <div class="nav nav-tabs justify-content-center border-secondary mb-4">
                    <a class="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Description</a>
                    <a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Information</a>
                    <a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
                </div>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="tab-pane-1">
                        <h4 class="mb-3">Product Description</h4>
                    </div>
                    <div class="tab-pane fade" id="tab-pane-2">
                        <h4 class="mb-3">Additional Information</h4>
                    </div>
                    <div class="tab-pane fade" id="tab-pane-3">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Shop Detail End -->
</template>
<script setup lang="ts">
import { useApiFetch, useLocalizedName } from '~/helper/helper';

const route = useRoute();
const { data: product } = useApiFetch<Product>(`/api/products/${route.params.id}`);
const selectedVariant = defineModel();
watchEffect(() => {
    if (product?.value) {
        selectedVariant.value = product?.value?.color;
        if (!product?.value?.images) {
            product.value = {
                ...toRaw(product.value),
                images: ['/img/no-image.jpg']
            }
        }

        useHead({
            title: `${useLocalizedName(product.value, 'name').value} | Commerce`,
            meta: [
                { name: 'description', content: 'Default product description' },
                { property: 'og:title', content: `${useLocalizedName(product.value, 'name').value} | Commerce` },
                { property: 'og:description', content: 'Default product description' },
                { property: 'og:image', content: product.value?.images?.[0] || '/img/no-image.jpg' },
                { property: 'og:type', content: 'product' }
            ]
        });
    }
})

useServerSeoMeta({
  title: computed(() => product.value ? `${useLocalizedName(product.value, 'name').value} | Commerce` : 'Commerce'),
  description: computed(() => 'Product details'),
  ogTitle: computed(() => product.value ? `${useLocalizedName(product.value, 'name').value} | Commerce` : 'Commerce'),
  ogDescription: computed(() => 'Product Details'),
  ogImage: computed(() => product.value?.images?.[0] || '/img/no-image.jpg'),
});

function onVariantSelect(variant: Variant) {
    if (product.value) {
        product.value = { ...toRaw(product.value), ...toRaw(variant) }
    }
}
</script>