<?php

use App\Http\Controllers\KartaController;
use App\Http\Controllers\PredalController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/', function () {
    return redirect(config('app.ui_url'));
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/clear-data', function () {
        Artisan::call('migrate:fresh', [
            '--force' => true,
        ]);
        Artisan::call('db:seed', [
            '--class' => 'UserSeeder',
            '--force' => true,
        ]);
    });

    Route::resource('/users', UserController::class)->except('index', 'create', 'edit');
    Route::put('/users/{entity}/{relation}', [UserController::class, 'updateRelation']);
    Route::post('/users/list', [UserController::class, 'list']);

    Route::resource('/kartas', KartaController::class)->parameters([
        'kartas' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/kartas/{entity}/{relation}', [KartaController::class, 'updateRelation']);
    Route::post('/kartas/list', [KartaController::class, 'list']);

    Route::resource('/predals', PredalController::class)->parameters([
        'predals' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/predals/{entity}/{relation}', [PredalController::class, 'updateRelation']);
    Route::post('/predals/list', [PredalController::class, 'list']);
});
