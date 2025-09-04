<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ClassModelController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudioController;
use App\Http\Controllers\TesterController;
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

    Route::resource('/classes', ClassModelController::class)->parameters([
        'classes' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/classes/{entity}/{relation}', [ClassModelController::class, 'updateRelation']);
    Route::post('/classes/list', [ClassModelController::class, 'list']);

    Route::resource('/instructors', InstructorController::class)->parameters([
        'instructors' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/instructors/{entity}/{relation}', [InstructorController::class, 'updateRelation']);
    Route::post('/instructors/list', [InstructorController::class, 'list']);

    Route::resource('/studios', StudioController::class)->parameters([
        'studios' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/studios/{entity}/{relation}', [StudioController::class, 'updateRelation']);
    Route::post('/studios/list', [StudioController::class, 'list']);

    Route::resource('/equipments', EquipmentController::class)->parameters([
        'equipments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/equipments/{entity}/{relation}', [EquipmentController::class, 'updateRelation']);
    Route::post('/equipments/list', [EquipmentController::class, 'list']);

    Route::resource('/bookings', BookingController::class)->parameters([
        'bookings' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/bookings/{entity}/{relation}', [BookingController::class, 'updateRelation']);
    Route::post('/bookings/list', [BookingController::class, 'list']);

    Route::resource('/programs', ProgramController::class)->parameters([
        'programs' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/programs/{entity}/{relation}', [ProgramController::class, 'updateRelation']);
    Route::post('/programs/list', [ProgramController::class, 'list']);

    Route::resource('/feedbacks', FeedbackController::class)->parameters([
        'feedbacks' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/feedbacks/{entity}/{relation}', [FeedbackController::class, 'updateRelation']);
    Route::post('/feedbacks/list', [FeedbackController::class, 'list']);

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

    Route::resource('/testers', TesterController::class)->parameters([
        'testers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/testers/{entity}/{relation}', [TesterController::class, 'updateRelation']);
    Route::post('/testers/list', [TesterController::class, 'list']);
});
