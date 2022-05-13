<template>
    <div :class="classnames(cardClass)">
        <div class="box-card-header box-card_header">
            <div :class="classnames(cardPlateClass)"></div>
        </div>

        <div class="box-card-body">
            <div class="box-card-image-wrapper">
                <img class="box-card-image" src="/images/box-default.png" alt="box">
            </div>
            <div class="box-card-header">{{ name }}</div>
            <div class="box-card-price">
                <span v-show="oldPrice" class="old-price mr-1">{{ oldPrice }}</span>
                <span class="price">{{ price }}</span>
            </div>
        </div>

        <div class="box-card-footer">
            <NavLink v-if="id !== -1" :href="'/roulette'" :data="{ boxId: id }">
                <button class="box-card-button">открыть</button>
            </NavLink>
            <button v-else class="box-card-button">открыть</button>
        </div>
    </div>
</template>

<script>
import NavLink from '@/Components/NavLink';

export default {
    components: {
        NavLink
    },

    props: {
        category_id: Number,

        name: {
            type: String,
            default: 'тестовая',
        },

        price: {
            type: Number,
            default: 600,
        },

        oldPrice: {
            type: Number,
            default: 0,
        },

        id: {
            type: Number,
        },

        type: {
            type: String,
            default: '',
        }
    },

    computed: {
        cardClass() {
            const classes = [ 'box-card' ];
            const modifier = this.type ? `box-card__${ this.type }` : null;

            classes.push( modifier );

            return classes;
        },

        cardPlateClass() {
            const classes = [ 'box-card-plate', 'box-card_plate', 'box-card-plate', ];
            const modifier = this.type ? `box-card-plate__${ this.type }` : null;

            classes.push( modifier );

            return classes;
        },
    },

    data() {
        return {};
    },

    methods: {},
}
</script>
