<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="{{asset('css/app.css')}}?time{{time()}}">
    </head>
    <body>
    <img src="/login.png" alt="" />
    <hr style="border-width: 1px; border-color: black" />

    <form class="login-form">
        <button class="btn" type="button">google</button>
    </form>
    <div class="row">
        <div class="col-6">1</div>
        <div class="col-6">2</div>
    </div>

    <style>
        .login-form {
            width: 460px;
        }
    </style>
    </body>
</html>
