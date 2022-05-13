<template>
    <div :id="modalId" class="modal fade" tabindex="-1" role="dialog">
        <div :class="['modal-dialog', classes?.modalDialog]" role="document">
            <div :class="['modal-content', classes?.modalContent]">

                <div class="d-block modal-header modal-section border-b-0">
                    <slot name="header"></slot>

                    <button v-if="close" type="button" :class="classesComputed.close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                            >
                                <path
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    d="M12 10.75L3.25 2 2 3.25 10.75 12 2 20.75 3.25 22 12 13.25 20.75 22 22 20.75 13.25 12 22 3.25 20.75 2z"
                                />
                            </svg>
                        </span>
                    </button>
                </div>


                <div :class="['modal-body', 'modal-section', classes?.body]">
                    <slot></slot>
                </div>

                <div class="modal-footer modal-section justify-content-center border-t-0 pt-0">
                    <slot name="footer"></slot>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import Styles from "@/Components/modal/Modal.module.css";

export default {
    props: {
        theme: String,
        modalId: String,
        classes: Object,
        close: {
            type: Boolean,
            default: true,
        }
    },

    data() {
        return {
            modal: null,
        };
    },

    methods: {
        show() {
            this.modal.modal( 'show' );
        },
        hide() {
            this.modal.modal( 'hide' );
        }
    },

    computed: {
        classesComputed() {
            const classes = {
                close: [
                    "close m-0 position-absolute right-0 top-0",
                    this?.classes?.close,
                    Styles.close
                ]
            };

            if ( this.theme ) {
                classes.close.push( Styles[ `close_theme_${ this.theme }` ] );
            }

            return classes;
        }
    },

    mounted() {
        this.modal = $( `#${ this.modalId }` );
    }
}
</script>
