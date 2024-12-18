<?php

use App\Models\Box\BoxItem;
use Illuminate\Support\Facades\Route;

Route
    ::middleware('role:admin')
    ->prefix('case')
    ->group(function () {
        Route::post('update-probability', [\App\Http\Controllers\Cases::class, 'updateProbability']);

        Route::post('add-random-item', [\App\Http\Controllers\Cases::class, 'addRandomItem']);

        Route::post('search-items', [\App\Http\Controllers\Cases::class, 'searchItems']);

        Route::post('remove-item', [\App\Http\Controllers\Cases::class, 'removeItem']);

        Route::post('set-on-preview', [\App\Http\Controllers\Cases::class, 'setOnPreview']);

        Route::post('add-item', [\App\Http\Controllers\Cases::class, 'addItem']);
    });
