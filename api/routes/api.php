<?php

use App\Http\Controllers\AsdfasdfasdController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\FitnessClassController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\TrainerController;
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

    Route::resource('/asdfasdfasds', AsdfasdfasdController::class)->parameters([
        'asdfasdfasds' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/asdfasdfasds/{entity}/{relation}', [AsdfasdfasdController::class, 'updateRelation']);
    Route::post('/asdfasdfasds/list', [AsdfasdfasdController::class, 'list']);

    Route::resource('/trainers', TrainerController::class)->parameters([
        'trainers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/trainers/{entity}/{relation}', [TrainerController::class, 'updateRelation']);
    Route::post('/trainers/list', [TrainerController::class, 'list']);

    Route::resource('/fitness-classs', FitnessClassController::class)->parameters([
        'fitness-classs' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/fitness-classs/{entity}/{relation}', [FitnessClassController::class, 'updateRelation']);
    Route::post('/fitness-classs/list', [FitnessClassController::class, 'list']);

    Route::resource('/bookings', BookingController::class)->parameters([
        'bookings' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/bookings/{entity}/{relation}', [BookingController::class, 'updateRelation']);
    Route::post('/bookings/list', [BookingController::class, 'list']);

    Route::resource('/memberships', MembershipController::class)->parameters([
        'memberships' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/memberships/{entity}/{relation}', [MembershipController::class, 'updateRelation']);
    Route::post('/memberships/list', [MembershipController::class, 'list']);
});
