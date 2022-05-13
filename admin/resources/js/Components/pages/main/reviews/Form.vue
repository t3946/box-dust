<template>
    <form class="d-flex align-items-end flex-col">
        <div
            :class="[Styles.input, Styles.textareaContainer, 'position-relative mb-3 w-100']"
        >
            <textarea

                :class="[Styles.textarea]"
                v-model="text"
                name="text"
                cols="30"
                rows="4"
                placeholder="Текст отзыва ..."
                maxlength="300"
            />

            <span :class="[Styles.textCounter, 'position-absolute']">{{text.length}}/300</span>
        </div>

        <button :class="[Styles.button, 'w-auto']">Отправить</button>
    </form>
</template>

<script>
import Styles from "@/Components/pages/main/reviews/Form.module.css";

export default {
    components: {},

    props: {
        review: Object,
    },

    data() {
        return {
            Styles,
            text: ""
        }
    },

    computed: {
        classes() {
            return {
            }
        },
    },
}
</script>
