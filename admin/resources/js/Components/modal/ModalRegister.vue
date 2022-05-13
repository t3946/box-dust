<template>
    <modal modal-id="modal-register" ref="modal">
        <template v-slot:header>
            <h5 class="modal-title pt-4 text-3xl text-black text-capitalize text-center w-100">регистрация</h5>
            <p class="text-black-50 text-center mb-0 mt-2">Зарегистрируйтесь, и получите один бесплатный спин!</p>
        </template>

        <form @submit.prevent="submit" :id="formId('registration')">
            <div class="input-group has-validation mb-3">
                <span class="border-r-0 d-block input-group-text rounded-r-none w-10" id="inputGroupPrependName">
                    <font-awesome-icon icon="user"/>
                </span>
                <input
                    type="text"
                    class="focus:border-purple-400 form-control shadow-none"
                    :class="{'is-invalid': formErrors.name}"
                    :id="inputId('name')"
                    aria-describedby="inputGroupPrependName"
                    aria-label="name"
                    v-model="form.name"
                    autocomplete="current-password"
                    placeholder="Имя"
                    :disabled="loading"
                    autofocus
                    required
                >
                <div v-show="formErrors.email" class="invalid-feedback">{{ formErrors.name }}</div>
            </div>

            <div class="input-group has-validation mb-3">
                <span class="border-r-0 d-block input-group-text rounded-r-none w-10" id="inputGroupPrependLogin">
                    <font-awesome-icon icon="envelope"/>
                </span>
                <input
                    type="text"
                    class="focus:border-purple-400 form-control shadow-none"
                    :class="{'is-invalid': formErrors.email}"
                    id="validationCustomEmail"
                    aria-describedby="inputGroupPrependLogin"
                    aria-label="login"
                    v-model="form.email"
                    autocomplete="name"
                    placeholder="E-mail"
                    autofocus
                    :disabled="loading"
                    required
                >
                <div v-show="formErrors.email" class="invalid-feedback">{{ formErrors.email }}</div>
            </div>

            <div class="input-group has-validation mb-3">
                <span class="border-r-0 d-block input-group-text rounded-r-none w-10" id="inputGroupPrependRegisterPassword">
                    <font-awesome-icon icon="lock"/>
                </span>
                <input
                    type="password"
                    class="focus:border-purple-400 form-control shadow-none"
                    :class="{'is-invalid': formErrors.password}"
                    id="validationRegisterPassword"
                    aria-describedby="inputGroupPrependRegisterPassword"
                    aria-label="password"
                    v-model="form.password"
                    autocomplete="current-password"
                    placeholder="Пароль"
                    :disabled="loading"
                    required
                >
                <div v-show="formErrors.email" class="invalid-feedback">{{ formErrors.password }}</div>
            </div>

            <div class="row mb-3">
                <div class="col-12">
                    <div class="custom-control custom-checkbox text-black">
                        <breeze-checkbox class="custom-control-input" id="userAgreement" v-model:checked="form.confirmAgreement" :disabled="loading"/>
                        <label class="custom-control-label capitalize" for="userAgreement">
                            Я принимаю условия
                            <a href="#" target="_blank" class="form-link">Пользовательского соглашения</a>
                        </label>
                    </div>
                </div>
            </div>

            <FormButton :loading="loading" :disabled="!form.confirmAgreement || loading" :type="'submit'">зарегистрироваться</FormButton>

            <p class="m-0 text-black-50 text-center">
                Уже зарегистрированы?
                <a href="#" @click="goToLogin" class="form-link">авторизация</a>
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
import FormHelper from '@/Helpers/FormHelper';
import FormButton from '@/Components/form/FormButton';

export default {
    mixins: [ FormHelper ],

    props: {
        errors: Object,
    },

    components: {
        Modal,
        FontAwesomeIcon,
        BreezeCheckbox,
        FormButton,
    },

    data() {
        return {
            formName: 'registration',
            loading: false,
            formErrors: {
                email: '',
                name: '',
                password: '',
                confirmAgreement: '',
            },
            form: this.$inertia.form( {
                // email: 'user' + Math.round(Math.random()*10000) + '@gmail.com',
                // name: 'User Name',
                // password: '12345678',
                email: 'qwer1234',
                name: '!',
                password: '123456',
                confirmAgreement: true,
            } ),
        };
    },

    watch: {
        'form.name'() {
            this.formErrors.name = false;
        },
        'form.email'() {
            this.formErrors.email = false;
        },
        'form.password'() {
            this.formErrors.password = false;
        },
        'form.confirmAgreement'() {
            this.formErrors.confirmAgreement = false;
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

            const formData = this.form
                .transform( data => ( {
                    ...data,
                    remember: this.form.remember ? 'on' : '',
                } ) )
                .data();

            this.loading = true;

            axios
                //register
                .post( this.route( 'register' ), formData )
                // auth success
                .then( res => {
                    this.loading = false;

                    // if ( res.data ) {
                    //     this.hide();
                    //     this.$inertia.visit( 'dashboard' );
                    // }
                } )
                // auth failed
                .catch( err => {
                    this.loading = false;

                    for ( const fieldName in err.response.data.errors ) {
                        if ( err.response.data.errors.hasOwnProperty( fieldName ) ) {
                            this.formErrors[ fieldName ] = err.response.data.errors[ fieldName ][ 0 ];
                        }
                    }
                } );
        },

        goToLogin() {
            this.$emit( 'goToLogin' );
        }
    },
}
</script>
