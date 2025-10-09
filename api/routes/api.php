<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ExpenseReportController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
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

    Route::resource('/expenses', ExpenseController::class)->parameters([
        'expenses' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/expenses/{entity}/{relation}', [ExpenseController::class, 'updateRelation']);
    Route::post('/expenses/list', [ExpenseController::class, 'list']);

    Route::resource('/categories', CategoryController::class)->parameters([
        'categories' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/categories/{entity}/{relation}', [CategoryController::class, 'updateRelation']);
    Route::post('/categories/list', [CategoryController::class, 'list']);

    Route::resource('/vendors', VendorController::class)->parameters([
        'vendors' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/vendors/{entity}/{relation}', [VendorController::class, 'updateRelation']);
    Route::post('/vendors/list', [VendorController::class, 'list']);

    Route::resource('/projects', ProjectController::class)->parameters([
        'projects' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/projects/{entity}/{relation}', [ProjectController::class, 'updateRelation']);
    Route::post('/projects/list', [ProjectController::class, 'list']);

    Route::resource('/budgets', BudgetController::class)->parameters([
        'budgets' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/budgets/{entity}/{relation}', [BudgetController::class, 'updateRelation']);
    Route::post('/budgets/list', [BudgetController::class, 'list']);

    Route::resource('/receipts', ReceiptController::class)->parameters([
        'receipts' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/receipts/{entity}/{relation}', [ReceiptController::class, 'updateRelation']);
    Route::post('/receipts/list', [ReceiptController::class, 'list']);

    Route::resource('/expense-reports', ExpenseReportController::class)->parameters([
        'expense-reports' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/expense-reports/{entity}/{relation}', [ExpenseReportController::class, 'updateRelation']);
    Route::post('/expense-reports/list', [ExpenseReportController::class, 'list']);

    Route::resource('/tags', TagController::class)->parameters([
        'tags' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/tags/{entity}/{relation}', [TagController::class, 'updateRelation']);
    Route::post('/tags/list', [TagController::class, 'list']);

    Route::resource('/currencies', CurrencyController::class)->parameters([
        'currencies' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/currencies/{entity}/{relation}', [CurrencyController::class, 'updateRelation']);
    Route::post('/currencies/list', [CurrencyController::class, 'list']);
});
