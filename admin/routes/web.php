<?php

use App\Http\Controllers\Vendor\Voyager\VoyagerBoxBreadController;
use App\Services\CatalogService;
use App\Services\PrizesService;
use App\Services\FakeHistory as FakeHistoryService;
use App\Services\FakeReviews as FakeReviewsService;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/main', function () {
    return Inertia::render('Main', [
//        'lastTopPrizes' => PrizesService::getLastTopPrizes(),
        'menu' => CatalogService::buildCatalog(),
        'prizesHistory' => FakeHistoryService::get(),
        'reviews' => FakeReviewsService::get(0, 10),
    ]);
})->name('Main');

Route::get('/roulette', function (Request $request) {
    if (!$box_id = $request->boxId) {
        redirect('Main');
    }

    $box = (array)DB::table('cases')->where('id', $box_id)->first();
    $items = DB::table('box_items')->where('box_id', $box_id)->get();
    $box['items'] = $items;

    return Inertia::render('Roulette', [
        'box' => $box,
    ]);
});

Route::get('/new-login', function () {
    return view('login');
})->middleware(['guest'])->name('new-login');

require __DIR__ . '/auth.php';


Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();

    Route::get('box/edit-items/{caseId}', [VoyagerBoxBreadController::class, 'editItems'])
        ->name('admin.box.edit-items');
});

