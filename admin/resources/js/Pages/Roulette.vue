<template>
    <div class="container">
        <hat/>

        <section>
            <div class="row">
                <div class="col-12">
                    <div class="go-to-main row mt-3 mb-3">
                        <NavLink href="main" :class="'go-to-main-link'">
                            <font-awesome-icon :icon="['fa', 'arrow-left']"/>
                            <span class="go-to-main-text">На главную</span>
                        </NavLink>
                    </div>

                    <h1 class="text-center mt-14">
                        <span class="neon roulette-header" data-text="Apple iPhone">Apple iPhone</span>
                    </h1>

                    <h1 style="color: #fff">
                        <div>slidesOffsets: {{ roulette.slidesOffsets }}</div>
                    </h1>

                    <div class="roulette" ref="roulette">
                        <div
                            class="roulette-wrapper"
                            :style="{
                                height: `${roulette.height}px`,
                            }"
                        >
                            <div v-for="index in roulette.slotsNumber"
                                 v-bind:class="classes.slot"
                                 :key="`roulette-slot-${index}`"
                                 :style="{left: roulette.slidesOffsets[index-1] + 'px'}"
                            >
                                <div class="roulette-item">
                                    <div :class="imageContainerClasses(index)" style="color: white; flex-direction: column">
                                        <img
                                            class="roulette-image"
                                            :src="'storage/' + items[index-1].image"
                                            :alt="items[index-1].name"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <img src="/images/roulette/arrow.png" alt="" height="70"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="roulette-ui">
                        <button class="roulette-ui-button roulette-ui-left-button" @click="stop"></button>
                        <button class="roulette-ui-button roulette-ui-center-button" @click="() => {stop(); idle();}"></button>
                        <button class="roulette-ui-button roulette-ui-right-button" @click="spin"></button>
                    </div>
                </div>
            </div>
        </section>

        <ModalPrize ref="modalPrize" :prize="items[0]" />
    </div>
</template>

<style scoped>
.go-to-main-link {
    color: white;
}

.go-to-main-text {
    font-size: 20px;
    padding: 0 0 0 5px;
}

.roulette-item {
    width: 290px;
    height: 385px;
    background: url('/images/roulette/rect3.png') no-repeat center center;
    background-size: cover;
    padding: 15px;
    color: #2c0085;
    background-origin: content-box;
}

.roulette-slot {
    width: 290px;
    height: 385px;
    position: absolute;
    box-sizing: border-box;
}

/*won card style*/
.roulette-image-container_winner {
    box-shadow: 0 0 4px 2px #edc706;
}

</style>

<script>
import $ from "jquery";
import Hat from '@/Layouts/Header';
import NavLink from '@/Components/NavLink';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import cn from "classnames";
import Styles from "@/Pages/Roulette.module.css";
import ModalPrize from "@/Components/roulette/ModalPrize";

require( 'jquery.easing' )( $ );

export default {
    name: "Roulette",

    props: [ 'box' ],

    components: {
        Hat,
        NavLink,
        FontAwesomeIcon,
        ModalPrize,
    },

    data() {
        return {
            number: 11,
            count: 0,
            items: [],
            images: ( () => {
                const images = [];

                for ( let i = 0; i < 11; i++ ) {
                    images.push( `/images/roulette/test-data/${ i }.png` );
                }

                return images;
            } )(),
            classes: {
                slot: cn( "roulette-slot", { [ Styles.rouletteSlot_default ]: false } ),
            },
            roulette: {
                html: {
                    $roulette: null,
                },
                slotsNumber: 0,
                slotsMap: [],
                itemsMap: [],
                speed: 44.8, // 1.8
                idleSpeed: 0.25, //0.006
                middleSpeed: 800,
                offset: 0,
                itemWidth: 290,
                height: 385,
                autoPlay: false,
                _lastRedraw: null,
                // если предствить, что слоты -- это окно просмотра сектора
                // списка элементов, то этот индекс -- начальная граница окна
                itemIndex: 0,

                slidesOnMiddle: 1, //20
                slidesOnBorders: 1, //20
                // текущие отступы для слайдов, чтобы не брать их из html разметки
                slidesOffsets: [],
                animationStack: [],
                debug: false,
                isIdle: true,
                nextWinnerItem: -1,
                currentItem: 0,
            },
        };
    },

    computed: {
        itemWidth() {
            return this.roulette.itemWidth + this.roulette.offset;
        },
    },

    methods: {
        imageContainerClasses(index) {
            return cn("roulette-image-container", {
                "roulette-image-container_winner": index === this.roulette.nextWinnerItem,
            });
        },

        /**
         * length -- shift length
         */
        shift( { length, easing, speed, beginShift = 0 }, callback ) {
            const self = this;
            // счётчик слотов ушедших из поля видимости
            // карта того, какой слот сейчас где находится, где ключ -- индекс элемента в рулетке, а значение -- i из следующего цикла
            let slotsGoneCount = 0;

            //анимировать каждый слот по отдельности
            const { itemWidth } = self.roulette;

            for ( let i = 0; i < self.roulette.slotsNumber; i++ ) {
                const animationObject = $( { shift: 0 } );

                self.animationStack.push(animationObject);

                animationObject.animate( { shift: -length }, {
                    duration: Math.round( length / speed ),
                    easing,

                    step( shift ) {
                        shift += beginShift;
                        // first item gone
                        const slotsMustWasGone = Math.floor( Math.abs( shift ) / itemWidth );

                        if ( i === 0 && slotsMustWasGone > slotsGoneCount ) {
                            const slotNumberFirst = self.roulette.slotsMap[ 0 ];
                            self.roulette.slotsMap.push( slotNumberFirst );
                            self.roulette.slotsMap.shift();
                            slotsGoneCount += 1;
                            self.roulette.itemIndex = ( self.roulette.itemIndex + 1 ) % self.items.length;

                            // update itemsMap
                            self.roulette.itemsMap.shift();
                            const lastIndex = self.roulette.itemsMap[self.roulette.itemsMap.length-1];
                            self.roulette.itemsMap.push((lastIndex + 1) % self.items.length);
                        }

                        const mapIndex = self.roulette.slotsMap.indexOf( i );

                        // new position will in [-itemWidth .. N * itemWidth]
                        self.roulette.slidesOffsets[ i ] = Math.round( mapIndex * itemWidth + shift % itemWidth );
                    },

                    complete() {
                        //исключить неныжне вызовы, оставив только один, он
                        // будет в рели callback функции для окончания анмиации
                        if ( i !== self.roulette.slotsNumber -1 ) {
                            return;
                        }

                        callback && callback();
                    }
                } );
            }
        },

        stop() {
            for ( let i = 0; i < this.animationStack.length; i++ ) {
                this.animationStack[ i ].stop( 1, 0 );
            }

            this.isIdle = false;
        },

        // получить отрицательное смещение первой карточки
        // (это надо для подсчёта отступа, если вначале карточки стояли не ровно)
        getBeginShift() {
            return this.roulette.slidesOffsets[this.getHeadIndex()];
        },

        // получить индекс крайней левой карточки в массиве отступов
        getHeadIndex() {
            let indexHead = 0;

            for (const i in this.roulette.slidesOffsets ) {
                if (this.roulette.slidesOffsets[i] < 0) {
                    indexHead = i;
                    break;
                }
            }

            return indexHead;
        },

        spin() {
            this.stop();
            let beginShift = this.getBeginShift();

            const beginOptions = {
                length: this.roulette.itemWidth * this.roulette.slidesOnBorders,
                easing: 'easeInQuad',
                speed: this.roulette.speed,
                beginShift
            };

            const middleOptions = {
                length: this.roulette.itemWidth * this.roulette.slidesOnMiddle,
                easing: 'linear',
                speed: this.roulette.speed * 2,
                beginShift
            }

            // для центрирования карточки над стрелкой
            let endShift = 0;
            let centerOnDesktop = -150;

            endShift = centerOnDesktop + beginShift;

            const endOptions = {
                length: this.roulette.itemWidth * this.roulette.slidesOnBorders + endShift,
                easing: 'easeOutQuad',
                speed: this.roulette.speed,
                beginShift
            }

            //рассчитать какая карта в ленте должна победить
            const itemsWillShifts = this.roulette.slidesOnBorders * 2 + this.roulette.slidesOnMiddle;

            this.roulette.nextWinnerItem = Math.round(this.roulette.currentItem + itemsWillShifts);

            console.log({nextWinnerItem: this.roulette.nextWinnerItem});

            this.shift( beginOptions, () => {
                this.shift( middleOptions, () => {
                    this.shift( endOptions, () => {
                        // this.idle();
                    } );
                } );
            } );
        },

        idle() {
            let beginShift = this.getBeginShift();

            const options = {
                length: this.itemWidth,
                easing: 'linear',
                speed: this.roulette.idleSpeed,
                beginShift,
            }

            this.shift( options, () => {
                if ( this.roulette.isIdle ) {
                    this.idle();
                }
            } );
        }
    },

    mounted() {
        // set initial offsets
        for ( let i = 0; i < this.roulette.slotsNumber; i++ ) {
            const offset = i * this.roulette.itemWidth;
            this.roulette.slidesOffsets.push( offset );
        }

        // this.idle();
        this.$refs.modalPrize.show();
    },

    created() {
        // слишком мало элементов для розыгрыша
        if ( this.box.items < this.roulette.slotsNumber ) {
            console.error( "Can't start game" );
            return;
        }

        this.animationStack = [];
        this.items = this.box.items.slice( 0 );
        this.roulette.slotsNumber = this.items.length;

        for ( let i = 0; i < this.roulette.slotsNumber; i++ ) {
            this.roulette.slotsMap.push( i );
            this.roulette.itemsMap.push( i )
        }
    }
}
</script>