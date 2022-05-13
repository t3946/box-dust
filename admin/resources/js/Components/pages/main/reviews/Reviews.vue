<template>
    <div>
        <div :class="classes.container">
            <img :class="classes.icon" src="/images/pages/main/reviews.png" alt="">

            <div>
                <h2 :class="classes.title">
                    Отзывы
                </h2>
            </div>
        </div>

        <div>
            <div :class="[Styles.reviewsList, 'mb-3 custom-scrollbar pr-3']" ref="list">
                <button
                    v-if="isAllLoaded === false"
                    :class="[StylesForm.button, 'w-100 mb-3']"
                    v-on:click="loadMore"
                    :disabled="isLoading"
                >
                    Больше отзывов
                </button>

                <Item v-for="item in items" :key="item.id" :class="Styles._item" :review="item" />
            </div>

            <Form />
        </div>
    </div>
</template>

<script>
import Styles from "@/Components/pages/main/reviews/Reviews.module.css";
import StylesForm from "@/Components/pages/main/reviews/Form.module.css";
import Item from "@/Components/pages/main/reviews/Item";
import Form from "@/Components/pages/main/reviews/Form";
import axios from "axios";

export default {
    components: {
        Item,
        Form,
    },

    props: {
        reviews: Array,
    },

    data() {
        return {
            Styles,
            StylesForm,
            isAllLoaded: false,
            isLoading: false,
            items: [],
        }
    },

    computed: {
        classes() {
            return {
                icon: [Styles.icon],
                container: ["d-flex", "align-items-center", "justify-content-center", "mb-4"],
                title: [Styles.title, "mb-0"],
            }
        },
    },

    methods: {
        async loadMore() {
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;

            const newReviews = await axios.get(`/api/reviews/${this.items.length}`).then((res) => {
               return res.data;
            });

            console.log({newReviews});

            this.isLoading = false;

            if (newReviews.length === 0) {
                this.isAllLoaded = true;
                return;
            }

            this.items = [...newReviews, ...this.items];
        }
    },

    mounted() {
        this.$refs.list.scroll(0, 100000);
    },

    created() {
        if (this.reviews.length === 0) {
            this.isAllLoaded = true;
        }

        this.items = [...this.reviews];
    }
}
</script>
