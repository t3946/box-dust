<template>
    <button :type="type" :class="[Styles.button, Styles[`button_theme_${theme}`]]">
        <slot/>
    </button>
</template>

<script>
import Styles from "@/Components/common/form/button/Button.module.css";

export default {
    props: {
        type: {
            type: String,
            default: 'submit',
        },
        theme: {
            type: String,
            default: 'success',
        }
    },
    data() {
        return {
            Styles,
        }
    }
}
</script>
