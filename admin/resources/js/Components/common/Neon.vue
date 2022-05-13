<template>
    <span :class="classesComputed.container">
        <span :class="classesComputed.before"></span>
        <span>{{ text }}</span>
        <span :class="classesComputed.after">{{ text }}</span>
    </span>
</template>

<script>
import Styles from "@/Components/common/Neon.module.css";

export default {
    props: {
        text: String,
        theme: String,
        classes: Object,
    },

    data() {
        return {
            Styles,
        }
    },

    computed: {
        classesComputed() {
            const classes = {
                container: [ this.Styles.neonText ],
                before: [ this.Styles.before ],
                after: [ this.Styles.after ],
            };

            if ( this.theme ) {
                classes.container.push( this.Styles[ `neonText_theme_${ this.theme }` ] );
                classes.before.push( this.Styles[ `before_theme_${ this.theme }` ] );
                classes.after.push( this.Styles[ `after_theme_${ this.theme }` ] );
            }

            return classes;
        }
    },

    methods: {},
}
</script>
