<template>
    <div>
        <button :type="type" class="btn h-14 text-2xl mb-3 form-button" :disabled="disabled">
            <slot v-if="!loading"></slot>
            <div v-else class="loader-inner ball-pulse">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </button>
    </div>
</template>

<script>
export default {
    name: "FormButton",
    props: {
        disabled: Boolean,
        loading: Boolean,
        type: {
            type: String,
            default: 'button',
        },
    }
}
</script>