<template>
    <div class="last-prize-container">
        <div class="last-prize">
            <div class="last-top-prize-caption">то призов<br>за час</div>
            <img class="last-prize-image" :src="'/storage/' + prize['item']['image']" alt="iphone" ref="image">
            <div class="last-prize-info" ref="info">
                <div class="last-prize-item-name" :title="'Приз: ' + prize[ 'item' ][ 'name' ]">
                    {{ prize[ 'item' ][ 'short_name' ] }}
                </div>
                <div class="last-prize-winner" :title="'Приз получил: ' + prize[ 'user' ][ 'name' ]">
                    {{ prize[ 'user' ][ 'name' ] }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "LastTopPrize.vue",

    props: {
        lastTopPrizes: {
            type: Array
        },
    },

    data() {
        return {
            prizeIndex: 0,
            //animation duration
            duration: 1500, //default: 1500
            //interval between prizes shows
            interval: 10000, //default: 10000
            //minimal image sizes
            minWidth:200,
            minHeight: 160,
        };
    },

    computed: {
        prize() {
            return this.lastTopPrizes[ this.prizeIndex ];
        },
    },

    methods: {
        setBlur: function ( blurRadius ) {
            $( this.$refs.info ).css( {
                "-webkit-filter": "blur(" + blurRadius + "px)",
                "filter": "blur(" + blurRadius + "px)"
            } );
        },

        blurIn: function ( complete = null ) {
            const setBlur = this.setBlur;

            $( { blurRadius: 40 } ).animate( { blurRadius: 0 }, {
                duration: this.duration / 2,
                easing: 'linear',

                step( blurRadius ) {
                    setBlur( blurRadius );
                },

                complete( blurRadius ) {
                    setBlur( blurRadius );
                    if ( complete ) complete();
                },
            } );
        },

        blurOut: function ( complete = null ) {
            const setBlur = this.setBlur;

            $( { blurRadius: 0 } ).animate( { blurRadius: 40 }, {
                duration: this.duration / 2,
                easing: 'linear',

                step( blurRadius ) {
                    setBlur( blurRadius );
                },

                complete( blurRadius ) {
                    setBlur( blurRadius );
                    if ( complete ) complete();
                },
            } );
        },

        imageOut( callback ) {
            const $image = $( this.$refs.image );

            $image.clearQueue().animate( {
                'width': $image.width() / 2,
                'opacity': 0,
                'top': $image.height() / 4
            }, this.duration / 2, callback );
        },

        imageIn( newImageWidth, newImageHeight ) {
            const maxWidth = this.minWidth;
            const maxHeight = this.minHeight;
            const image_r = newImageWidth / newImageHeight;
            const container_r = maxWidth / maxHeight;
            let width;

            //overflow by width
            if ( image_r > container_r ) {
                width = maxWidth;
            } else if ( newImageHeight > maxHeight ) {
                const k = newImageHeight / maxHeight;
                width = newImageWidth / k;
            } else {
                const k = maxHeight / newImageHeight;
                width = newImageWidth * k;
            }

            const $image = $( this.$refs.image );

            $image.clearQueue().animate( {
                'width': width,
                'opacity': 1,
                'top': 0
            }, this.duration / 2 );
        },

        nextPrize() {
            const newPrizeIndex = ( this.prizeIndex + 1 ) % this.lastTopPrizes.length;

            this.blurOut( () => {
                this.blurIn();
                this.prizeIndex = newPrizeIndex;
            } );

            const newImageSize = this.lastTopPrizes[ newPrizeIndex ][ 'image' ];

            this.imageOut( () => {
                this.imageIn( newImageSize.width, newImageSize.height );
            } );
        },
    },

    mounted() {
        $( () => {
            setInterval( () => {
                this.nextPrize();
            }, this.interval );
        } );
    }
}
</script>