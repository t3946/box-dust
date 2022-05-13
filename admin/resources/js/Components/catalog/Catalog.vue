<template>
    <div class="card-list">
        <div class="row">
            <div v-for="box in category.boxes" class="col-3 mb-4">
                <BoxCard
                    :type="determineType(box)"
                    :name="box.name"
                    :old-price="box.old_price"
                    :price="box.price"
                    :id="box.box_id"
                />
            </div>

    <!--            <div v-for="type in testBoxes" class="col-3 mb-4">-->
    <!--                <BoxCard :type="type" :old-price="499" :id="-1" />-->
    <!--            </div>-->
        </div>
    </div>
</template>

<script>
import BoxCard from '@/Components/catalog/BoxCard';

export default {
    components: {
        BoxCard,
    },

    props: {
        category: Object,
    },

    watch: {
        category: function ( newCategory ) {
            console.log( 'CATEGORY CHANGED', newCategory );
        },
    },

    data() {
        return {
            testBoxes: [ "", "discount", "hot", "event", "allin" ],
            boxes: [],
        };
    },

    methods: {
        determineType( box ) {
            if ( box.old_price ) {
                return 'discount';
            }

            return null;
        },
    },
}
</script>
