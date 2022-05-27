<template>
    <div class="container">
        <hat />

        <section class="events mt-4 row">
            <div class="col-9 lg:text-right pl-0 d-none d-lg-block">
                <skew-slider/>
            </div>

            <div class="col col-lg-3 pr-0">
                <!-- Коробка не указана в этой карточке -->
                <div class="events-panel">
<!--                    <LastTopPrize :lastTopPrizes="lastTopPrizes" />-->
                </div>
            </div>

            <div class="col-12 mt-4 pl-0 pr-0">
                <HistoryLine :prizesHistory="prizesHistory" />
            </div>
        </section>

        <section class="row mt-4 categories">
            <div class="col-12 pl-0 pr-0 d-none d-md-block">
                <div class="category-tiles">
                    <div
                        v-for="(item, i) in menu"
                        @click="onSelectCategory(i)"
                        :class="['category-tile', `category-tile-${i+1}`]"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </section>

        <section class="row">
            <div class="col-12">
                <h2 class="text-center mt-10 mb-10 text-5xl">
                    <span class="neon" :data-text="menu[selectedMenuItemId].name">{{ menu[selectedMenuItemId].name }}</span>
                </h2>

                <Catalog :category="menu[selectedMenuItemId]" />
            </div>
        </section>

        <section class="row mt-5">
            <div class="col-12">
                <delivery />
            </div>
        </section>

        <section class="row mt-5">
            <div class="col-12 col-md-6 d-flex justify-content-center align-items-start">
                <Reviews :reviews="reviews" />
            </div>

            <div class="col-12 col-md-6 d-flex justify-content-center align-items-start">
                <FAQ />
            </div>
        </section>
    </div>
</template>

<style scoped>

.events-panel {
    background: #060019;
}

</style>

<script>
import SkewSlider from '@/Components/SkewSlider';
import Catalog from '@/Components/catalog/Catalog';
import Hat from '@/Layouts/Header';
import LastTopPrize from '@/Components/LastTopPrize';
import HistoryLine from "@/Components/pages/main/history-line/HistoryLine";
import Delivery from "@/Components/pages/main/delivery/Delivery";
import Reviews from "@/Components/pages/main/reviews/Reviews";
import FAQ from "@/Components/pages/main/faq/FAQ";

export default {
    components: {
        Delivery,
        SkewSlider,
        Catalog,
        Hat,
        LastTopPrize,
        HistoryLine,
        Reviews,
        FAQ,
    },

    props: {
        menu: Object,
        errors: Object,
        lastTopPrizes: Object,
        prizesHistory: Object,
        reviews: Array,
    },

    data() {
        return {
            selectedMenuItemId: 0,
        }
    },

    methods: {
        onSelectCategory( i ) {
            this.selectedMenuItemId = i;
        },
    },

    created() {
        console.log(this.menu);
    }
}
</script>
