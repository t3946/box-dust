<template>
    <div :class="classes.container">
        <div :class="classes.wrapper">
            <template v-for="item in items">
                <Item :item="item"/>
            </template>
        </div>
    </div>
</template>

<script>
import Styles from "@/Components/pages/main/history-line/HistoryLine.module.css";
import Item from "@/Components/pages/main/history-line/Item";

export default {
    components: {
        Item,
    },

    props: {
        prizesHistory: Object,
    },

    data() {
        return {
            Styles,
            items: [],
            history: [],
            historyIndex: 0,
            speed: 2,
        }
    },

    computed: {
        classes() {
            return {
                container: [
                    Styles.eventsPanel,
                    Styles.historyLine,
                ],
                item: [
                    Styles.historyLineItem,
                ],
                wrapper: [
                    "d-flex",
                    "overflow-hidden",
                ]
            }
        },
    },

    methods: {
        moveHistory() {
            this.historyIndex = ( this.historyIndex + 1 ) % this.history.length;
            this.items.pop();
            this.items.unshift( this.history[ this.historyIndex ] );
        }
    },

    created() {
        const start = 0;
        const items = [];
        const { map, library } = this.prizesHistory;

        console.log({ map, library });

        for ( let i = 0; i < map.boxes.length; i++ ) {
            const boxId = map.boxes[ i ];
            const winnerId = map.winners[ i ];
            const itemId = map.items[ i ];

            items.push( {
                box: {
                    id: boxId,
                    url: "/roulette",
                    image: library.boxes[ boxId ].image,
                    name: library.boxes[ boxId ].name,
                },
                prize: library.items[ itemId ],
                winner: library.winners[ winnerId ].name,
            } )
        }

        this.history = items;
        this.items = this.history.slice( 0, 6 );

        const d = new Date();
        const second = d.getMinutes() % 5 * 60 * this.speed + d.getSeconds();

        this.historyIndex = Math.round( second / this.speed ) % this.items.length;
    },

    mounted() {
        setInterval( () => {
            this.moveHistory();
        }, 1000 * this.speed );
    }
}
</script>
