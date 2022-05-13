<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    >
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script src="{{ asset('js/app.js') }}"></script>
    <title>Main</title>
</head>
<body>
<div class="container">
    <header class="header">
        <div class="header-main-row row">
            <div class="header-ui-column col-12">
                <a class="convex-button login-button" href="#">
                    <span class="convex-button-content">Войти</span>
                </a>
                <div class="header__registration">
                    <div class="header__registration-button">
                        <a class="registration-button" href="#">Регистрация</a>
                    </div>
                    <div class="social-networks d-flex justify-content-between">
                        <a href="#"><img class="social-icon" src="/images/icons/social-networks/facebook.svg" alt=""></a>
                        <a href="#"><img class="social-icon" src="/images/icons/social-networks/google-plus.svg" alt=""></a>
                        <a href="#"><img class="social-icon" src="/images/icons/social-networks/mailru.svg" alt=""></a>
                        <a href="#"><img class="social-icon" src="/images/icons/social-networks/yandex.svg" alt=""></a>
                        <a href="#"><img class="social-icon" src="/images/icons/social-networks/vk.svg" alt=""></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-menu-panel">
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
    </header>

    <section class="events mt-4">
        <div class="row">
            <div class="col-9">
                <div class="events-panel" style="height: 350px"></div>
            </div>
            <div class="col-3">
                {{-- Коробка не указана в этой карточке --}}
                <div class="events-panel">
                    @include('components.boxes.last-prize')
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <ul class="events-panel history-line list-unstyled">
                    <li class="history-line-item" style="border-color: #435d69;">
                        <div class="history-line-item-content">
                            <img class="history-line-prize-image" src="/images/item-default.png" alt="" />
                            <div class="history-line-item-caption">
                                <span class="last-prize-item-name" style="color: #95adba;">IPhone 12 Pro</span><br>
                                <span class="last-prize-winner">Derzkiy Spasatel</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <section class="">
        <div class="row tiles-section__row">
            <div class="col-12">
                @include('js.Components.box.categories-tiles')
            </div>
        </div>
    </section>
</div>
</body>
</html>
