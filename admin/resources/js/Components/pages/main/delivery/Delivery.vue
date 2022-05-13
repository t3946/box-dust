<template>
    <div :class="classes.container">
        <img src="/images/pages/main/delivery-box.png" alt="">
        <div>
            <h2 :class="classes.title1">
                Доставка по России и странам СНГ <b :class="Styles.strong">бесплатно</b>
            </h2>

            <h3 :class="classes.title2">
                Доставим посылку или <b :class="Styles.strong">вернём деньги!</b>
            </h3>
        </div>
    </div>
</template>

<script>
import Styles from "@/Components/pages/main/delivery/Delivery.module.css";

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
                container: [
                    "d-flex",
                    "align-items-center",
                ],
                title1: [
                    Styles.title1,
                    "mb-4",
                ],
                title2: [
                    Styles.title2,
                    "mb-0",
                ]
            }
        },
    },

}
</script>
