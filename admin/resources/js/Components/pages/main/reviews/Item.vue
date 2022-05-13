<template>
    <div :class="classes.container">
        <div :class="['mb-2']">
            <span :class="classes.author">{{ review.name }}</span>
        </div>
        <p :class="[classes.message, 'm-0']">{{ review.text }}</p>

        <div :class="['mt-2', 'text-right']">
            <span :class="classes.date">01.01.2022</span>
        </div>
    </div>
</template>

<script>
import Styles from "@/Components/pages/main/reviews/Item.module.css";

export default {
    components: {},

    props: {
        review: Object,
    },

    data() {
        return {
            Styles,
        }
    },

    computed: {
        classes() {
            return {
                header: Styles.header,
                author: Styles.author,
                message: Styles.message,
                container: Styles.container,
                date: Styles.date,
            }
        },
    },
}
</script>
