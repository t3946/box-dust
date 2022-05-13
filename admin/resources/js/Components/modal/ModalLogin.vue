<template>
    <modal modal-id="login-modal" ref="modal">
        <template v-slot:header>
            <h5 class="modal-title pt-4 text-3xl text-black text-capitalize text-center w-100">войти</h5>
            <p class="text-black-50 text-center mb-0 mt-2">Авторизуйтесь чтобы играть и выигрывать</p>
        </template>

        <form @submit.prevent="submit">
            <div class="input-group has-validation mb-3">
                <span class="border-r-0 d-block input-group-text rounded-r-none w-10" id="inputGroupPrependLogin">
                    <font-awesome-icon icon="envelope"/>
                </span>
                <input
                    type="text"
                    class="focus:border-purple-400 form-control shadow-none"
                    :class="{
                        'is-invalid': error.hasErrors,
                    }"
                    id="validationCustomUsername"
                    aria-describedby="inputGroupPrependLogin"
                    aria-label="login"
                    v-model="form.email"
                    autocomplete="username"
                    placeholder="E-mail"
                    :disabled="loading"
                    autofocus
                    required
                >
            </div>

            <div class="input-group has-validation mb-3">
                <span class="border-r-0 d-block input-group-text rounded-r-none w-10" id="inputGroupPrependPassword">
                    <font-awesome-icon icon="lock"/>
                </span>
                <input
                    type="password"
                    class="focus:border-purple-400 form-control shadow-none"
                    :class="{
                        'is-invalid': error.hasErrors,
                    }"
                    id="validationLoginPassword"
                    aria-describedby="inputGroupPrependPassword"
                    aria-label="password"
                    v-model="form.password"
                    autocomplete="current-password"
                    placeholder="Пароль"
                    :disabled="loading"
                    required
                >
            </div>

            <div class="row mb-3">
                <div class="col-6">
                    <div class="custom-control custom-checkbox text-black">
                        <breeze-checkbox class="custom-control-input" id="customCheck1" v-model:checked="form.remember" :disabled="loading"/>
                        <label class="custom-control-label capitalize" for="customCheck1">запомнить меня</label>
                    </div>
                </div>
                <div class="col-6 text-right">
                    <inertia-link :href="route('password.request')" @click="resetPassword" class="form-link">забыли пароль?</inertia-link>
                </div>
            </div>

            <p v-if="error.hasErrors">
                <i class="text-red-500">{{ error.message }}</i>
            </p>

            <FormButton :loading="loading" :disabled="loading" :type="'submit'">войти</FormButton>

            <p class="m-0 text-black-50 text-center">
                Нет аккаунта?
                <a href="#" @click.prevent="goToRegistration" class="form-link">регистрация</a>
            </p>

            <div class="pt-3 pb-3 mt-3 mb-3 position-relative">
                <hr class="bg-black m-0 opacity-10">
                <span class="text-black-50 bg-white position-absolute left-0.5 top-1/2 left-1/2 italic modal-divider-caption">или</span>
            </div>

            <div class="row">
                <div class="col-6">
                    <button type="button" class="form-button__gmail">
                        <font-awesome-icon :icon="['fab', 'google']"/>
                        Войти с Google
                    </button>
                </div>
                <div class="col-6">
                    <button type="button" class="form-button__vk">
                        <font-awesome-icon :icon="['fab', 'vk']"/>
                        Войти с VK
                    </button>
                </div>
            </div>
        </form>

        <template v-slot:footer>
            <p class="text-black text-center opacity-30">Все права защищены. © Box Dust 2021 box-dust.ru</p>
        </template>
    </modal>
</template>

<script>
import BreezeCheckbox from '@/Components/Checkbox'
import Modal from "@/Components/modal/Modal";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import FormButton from '@/Components/form/FormButton';

export default {
    components: {
        Modal,
        FontAwesomeIcon,
        BreezeCheckbox,
        FormButton,
    },

    data() {
        return {
            loading: false,
            error: {
                hasErrors: false,
                message: null,
            },
            form: this.$inertia.form( {
                email: '',
                password: '',
                remember: false,
            } ),
        };
    },

    watch: {
        'form.email'() {
            this.error.hasErrors = false;
        },
        'form.password'() {
            this.error.hasErrors = false;
        },
    },

    methods: {
        show() {
            this.$refs.modal.show();
        },

        hide() {
            this.$refs.modal.hide();
        },

        submit( e ) {
            e.preventDefault();

            this.loading = true;

            // get form fields
            const formData = this.form
                .transform( data => ( {
                    ...data,
                    remember: this.form.remember ? 'on' : ''
                } ) )
                .data();

            // auth
            axios
                .post( this.route( 'ajax.login' ), formData )
                // auth success
                .then( res => {
                    this.loading = false;

                    if ( res.data ) {
                        this.hide();
                        this.$inertia.visit( 'dashboard' );
                    }
                } )
                // auth failed
                .catch( err => {
                    this.loading = false;

                    this.error.hasErrors = true;
                    this.error.message = err.response.data.errors.email[ 0 ];
                } );
        },

        goToRegistration() {
            this.$emit('goToRegistration');
        },

        resetPassword() {
            alert('reset password plug');
        },
    },
}
</script>
