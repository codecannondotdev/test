<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ClassModelController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SubscriptionController;
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

    Route::resource('/members', MemberController::class)->parameters([
        'members' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/members/{entity}/{relation}', [MemberController::class, 'updateRelation']);
    Route::post('/members/list', [MemberController::class, 'list']);

    Route::resource('/trainers', TrainerController::class)->parameters([
        'trainers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/trainers/{entity}/{relation}', [TrainerController::class, 'updateRelation']);
    Route::post('/trainers/list', [TrainerController::class, 'list']);

    Route::resource('/classes', ClassModelController::class)->parameters([
        'classes' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/classes/{entity}/{relation}', [ClassModelController::class, 'updateRelation']);
    Route::post('/classes/list', [ClassModelController::class, 'list']);

    Route::resource('/sessions', SessionController::class)->parameters([
        'sessions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/sessions/{entity}/{relation}', [SessionController::class, 'updateRelation']);
    Route::post('/sessions/list', [SessionController::class, 'list']);

    Route::resource('/equipment', EquipmentController::class)->parameters([
        'equipment' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/equipment/{entity}/{relation}', [EquipmentController::class, 'updateRelation']);
    Route::post('/equipment/list', [EquipmentController::class, 'list']);

    Route::resource('/bookings', BookingController::class)->parameters([
        'bookings' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/bookings/{entity}/{relation}', [BookingController::class, 'updateRelation']);
    Route::post('/bookings/list', [BookingController::class, 'list']);

    Route::resource('/payments', PaymentController::class)->parameters([
        'payments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/payments/{entity}/{relation}', [PaymentController::class, 'updateRelation']);
    Route::post('/payments/list', [PaymentController::class, 'list']);

    Route::resource('/schedules', ScheduleController::class)->parameters([
        'schedules' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/schedules/{entity}/{relation}', [ScheduleController::class, 'updateRelation']);
    Route::post('/schedules/list', [ScheduleController::class, 'list']);

    Route::resource('/facilities', FacilityController::class)->parameters([
        'facilities' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/facilities/{entity}/{relation}', [FacilityController::class, 'updateRelation']);
    Route::post('/facilities/list', [FacilityController::class, 'list']);

    Route::resource('/subscriptions', SubscriptionController::class)->parameters([
        'subscriptions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/subscriptions/{entity}/{relation}', [SubscriptionController::class, 'updateRelation']);
    Route::post('/subscriptions/list', [SubscriptionController::class, 'list']);
});
