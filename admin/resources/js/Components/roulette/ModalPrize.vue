<template>
    <modal
        modal-id="modal-prize"
        ref="modal"
        :classes="classes.modal"
        :theme="'dark'"
        :close="false"
    >
        <template v-slot:header>
            <h1 :class="classes.title">
                <Neon text="Поздравляем!"/>
            </h1>

            <h2 :class="classes.titleSecond">
                Ваш выигрыш: <br>
                <span class="d-md-none">{{ prize.short_name }}</span>
                <span class="d-none d-md-block">{{ prize.name }}</span>
            </h2>
        </template>

        <div class="row">
            <div class="col-12 col-md-5 text-center">
                <img :class="Styles.image" :src="'storage/' + prize.image" alt=""/>
            </div>

            <div class="col-12 col-md-7">
                <div class="description d-none d-lg-block" v-html="prize.description"/>

                <div class="mt-4 d-flex justify-content-md-between flex-column flex-lg-row">
                    <Button @click="save" class="mb-3 mb-lg-0" theme="success">сохранить</Button>
                    <Button @click="sell" theme="danger">продать<span class="d-lg-none"> ({{ prize.list_price.toLocaleString() }}р.)</span></Button>
                </div>
            </div>
        </div>

        <template v-slot:footer>
            <div class="pt-2 m-0">
                <div :class="['text-center', Styles.text_theme_dark]">Список всех выигрышей можно посмотреть в личном кабинете</div>
            </div>
        </template>
    </modal>
</template>

<script>
import BreezeCheckbox from '@/Components/Checkbox'
import Modal from "@/Components/modal/Modal";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import FormHelper from '@/Helpers/FormHelper';
import FormButton from '@/Components/form/FormButton';
import Styles from "@/Components/roulette/ModalPrize.module.css";
import Neon from "@/Components/common/Neon";
import Button from "@/Components/common/form/button/Button";

export default {
    mixins: [ FormHelper ],

    props: {
        errors: Object,
        prize: Object,
    },

    components: {
        Modal,
        FontAwesomeIcon,
        BreezeCheckbox,
        FormButton,
        Neon,
        Button,
    },

    data() {
        return {
            Styles,
        };
    },

    methods: {
        show() {
            this.$refs.modal.show();
        },

        hide() {
            this.$refs.modal.hide();
        },

        save() {
            this.$refs.modal.hide();
        },

        sell() {
            this.$refs.modal.hide();
        }
    },

    computed: {
        classes() {
            return {
                modal: {
                    body: [ "px-3", "px-md-4", "py-2", "py-md-3" ],
                    modalDialog: Styles.modalDialog_prize,
                    modalContent: Styles.modalContent,
                },
                title: [
                    'modal-title text-black text-capitalize text-center w-100',
                    'mt-2',
                    'mt-md-3',
                    'mt-lg-4',
                    Styles.title
                ],
                titleSecond: [
                    'text-center mb-0 mt-2 mt-md-4',
                    Styles.titleSecond,
                ]
            };
        }
    },

    mounted() {
        console.log( this.prize )
    }
}
</script>
