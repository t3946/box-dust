<template>
    <header class="header row">
        <div class="header-ui-column col-12">
            <div class="header__registration">
                <a class="registration-button" href="#" @click="showModalRegister">Регистрация</a>
            </div>
            <a class="convex-button login-button hover:no-underline" href="#" @click="showModalLogin">
                <span class="convex-button-content">Войти</span>
            </a>
        </div>
        <div class="header-menu-panel col-12">
            <nav>
                <ul class="header-menu list-unstyled">
                    <li class="header-menu-item"><a class="header-menu-item-link" href="#">Всё</a></li>
                    <li class="header-menu-item"><a class="header-menu-item-link" href="#">Дешёвые</a></li>
                    <li class="header-menu-item"><a class="header-menu-item-link" href="#">Телефоны</a></li>
                    <li class="header-menu-item"><a class="header-menu-item-link" href="#">Гаджеты</a></li>
                    <li class="header-menu-item"><a class="header-menu-item-link" href="#">Бьюти</a></li>
                    <li class="header-menu-item"><a class="header-menu-item-link" href="#">Гейминг</a></li>
                    <li class="header-menu-item"><a class="header-menu-item-link" href="#">Топ</a></li>
                    <li class="header-menu-item"><a class="header-menu-item-link" href="#">Прочее</a></li>
                </ul>
            </nav>
        </div>


        <ModalLogin ref="modalLogin" @goToRegistration="goToRegistration"/>
        <ModalRegister ref="modalRegister" @goToLogin="goToLogin"/>
    </header>
</template>

<script>
import ModalLogin from '@/Components/modal/ModalLogin';
import ModalRegister from '@/Components/modal/ModalRegister';

export default {
    name: "Header",

    components: {
        ModalLogin,
        ModalRegister,
    },

    methods: {
        showModalLogin() {
            this.$refs.modalLogin.show();
        },

        showModalRegister() {
            this.$refs.modalRegister.show();
        },

        goToRegistration() {
            this.$refs.modalLogin.hide();
            this.$refs.modalRegister.show();
        },

        goToLogin() {
            this.$refs.modalRegister.hide();
            this.$refs.modalLogin.show();
        },
    },
}
</script>

<style scoped>

</style>