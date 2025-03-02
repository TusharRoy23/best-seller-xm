<template>
    <!-- Topbar Start -->
    <div class="container-fluid">
        <div class="row bg-secondary py-2 px-xl-5">
            <div class="col-lg-6 d-none d-lg-block">
            </div>
            <div class="col-lg-6 text-center text-lg-right">
                <select v-model="useLanguageStore().selectedLanguage">
                    <option :value="language.code" v-for="(language) in languageList">
                        {{ language.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <ClientOnly>
                    <NuxtLink to="/" class="text-decoration-none">
                        <h1 class="m-0 display-5 font-weight-semi-bold"><span
                                class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </NuxtLink>
                </ClientOnly>
            </div>
            <div class="col-lg-6 col-6 text-left">
                <div class="input-group">
                    <input type="text" v-model="searchQuery" @keyup.enter="searchProduct" class="form-control" placeholder="Search for products">
                    <div class="input-group-append">
                        <span class="input-group-text bg-transparent text-primary">
                            <i class="fa fa-search"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Topbar End -->
</template>
<script lang="ts" setup>
    const router = useRouter();
    const languageList: Array<{ name: string, code: string }> = [
        { name: 'EN', code: 'en' },
        { name: 'DK', code: 'dk' }
    ];
    const searchQuery = ref();

    const searchProduct = () => {
        router.push({
            path: '/',
            query: { search: searchQuery.value.trim() }
        })
    }

</script>