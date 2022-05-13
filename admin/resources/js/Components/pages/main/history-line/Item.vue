<template>
    <nav-link :href="'/roulette'" :data="{ boxId: item.box.id }" class="text-decoration-none mr-3">
        <div :class="classes.container">
            <div class="row flex-grow-1 no-gutters">
                <div class="col-5 d-flex align-items-center justify-content-center p-0">
                    <img :class="Styles.image" :src="item.box.image" alt=""/>
                </div>
                <div class="col-3 d-flex align-items-center justify-content-center p-0">
                    <span :class="classes.arrow"><font-awesome-icon :icon="['fa', 'arrow-right']"/></span>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-center p-0">
                    <img :class="Styles.image" :src="item.prize.image" alt=""/>
                </div>
            </div>

            <div :class="classes.caption">
                <span :class="Styles.winner">{{ item.winner }}</span>
            </div>
        </div>
    </nav-link>
</template>

<script>
import Styles from "@/Components/pages/main/history-line/Item.module.css";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import NavLink from '@/Components/NavLink';

export default {
    components: {
        FontAwesomeIcon,
        NavLink,
    },

    props: {
        item: {
            box: {
                url: String,
                image: String,
                name: String,
            },

            item: {
                image: String,
                name: String,
            },

            winner: String,
        },
    },

    data() {
        return {
            Styles,
        }
    },

    computed: {
        classes() {
            return {
                container: [
                    Styles.container,
                    "d-flex",
                    "flex-column",
                    "flex-shrink-0",
                ],

                caption: [
                    Styles.caption,
                ],

                arrow: [
                    Styles.arrow,
                ],
            }
        },
    },

}
</script>
