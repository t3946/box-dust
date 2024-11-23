<?php

use App\Models\Cases\BoxItem;
use Illuminate\Support\Facades\Route;

Route
    ::middleware('role:admin')
    ->prefix('cs-item')
    ->group(function () {
        Route::post('save-image', [\App\Http\Controllers\CSItem::class, 'saveImage']);
    });
