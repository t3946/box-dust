<template>
    <div class="skew-slider">
        <div class="skew-slider-wrapper events-panel">
            <div v-for="i in 5" class="skew-slide" :class="{'skew-slide__active': i === activeIndex}" @click="openSlide(i)">
                <div class="skew-slide-preview" :class="{'skew-slide-preview__active': i === activeIndex}">
                    <img class="skew-slide-preview-img" :src="getImageUrl(i)" :alt="i"/>
                </div>
                <div class="skew-slide-content">
                    <img class="skew-slide-content-img" :class="{'skew-slide-content-img__active': i === activeIndex}" :src="getImageUrl(i)" :alt="i"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    methods: {
        getImageUrl( index ) {
            return `/images/skew-slider-dummy/${ index }.png`;
        },

        openSlide( index ) {
            // transition animation ended
            const now = Date.now();

            if ( this.lastOpenTime + this.changeSlideAnimationDuration <= now ) {
                this.lastOpenTime = now;
                this.activeIndex = index;
            }
        }
    },
    data() {
        return {
            activeIndex: 2,
            lastOpenTime: 0,
            changeSlideAnimationDuration: 500,
        };
    },
};
</script>
