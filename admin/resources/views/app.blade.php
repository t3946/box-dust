<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        <!-- Scripts -->
        @routes
        <script src="{{ mix('js/app.js') }}" defer></script>

        <style>
            .tiles-section__row {
                margin-top: 40px;
            }


            .events-panel {
                background: #060019;
            }


            .history-line-item {
                padding: 10px;
                height: 170px;
                width: 240px;
                box-sizing: content-box;
                overflow: hidden;
                background: #19181a;
                border-bottom: 3px solid;
            }

            .history-line-item-content {
                width: 100%;
                height: 100%;
                position: relative;
            }

            .history-line-prize-image {
                position: absolute;
                width: 100px;
                left: 50%;
                transform: translateX(-50%);
            }

            .history-line-item-caption {
                position: absolute;
                background: linear-gradient(0deg, #19181a 84%, transparent);
                text-align: center;
                width: calc(100% + 20px);
                padding: 10px 0 0;
                left: -10px;
                bottom: -10px;
            }

            .history-line {
                padding: 20px;
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
