<template>
    <div :class="classes.container">
        <img :class="classes.icon" src="/images/pages/main/faq.png" alt="">

        <h2 :class="classes.title">
            Как играть?
        </h2>
    </div>
</template>

<script>
import Styles from "@/Components/pages/main/faq/FAQ.module.css";

export default {
    components: {},

    props: {},

    data() {
        return {
            Styles,
        }
    },

    computed: {
        classes() {
            return {
                icon: [Styles.icon],
                container: ["d-flex", "align-items-center"],
                title: [Styles.title, "mb-0", ""],
            }
        },
    },
}
</script>
