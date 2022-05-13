<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public static function rules () {
        return [
            'name' => 'required|string|max:255|min:3',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ];
    }

    public function messages()
    {
        return [
            'email.email' => 'Не верный e-mail',
            'name.min' => 'Минимальная длина имени 3 символа',
            'name.required' => 'Поле Имя обязательно для заполнения',
            'password.required' => 'Поле Пароль обязательно для заполнения',
            'password.min' => 'Минимальная длина пароля 8 символов',
        ];
    }
}
