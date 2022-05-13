<?php

use App\Http\Controllers\PrizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\FakeReviews as FakeReviewsService;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(["prefix" => "reviews"], function() {
    Route::get('/{offset}', function ($offset) {
        $reviews = FakeReviewsService::get($offset, 3);

        return response()->json($reviews);
    });
});

Route::get( 'last-prize.blocks', [ PrizeController::class, 'getLast' ] );
