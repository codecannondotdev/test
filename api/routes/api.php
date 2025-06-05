<?php

use App\Http\Controllers\CarModelController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\FactoryController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MineController;
use App\Http\Controllers\MiningOperationController;
use App\Http\Controllers\ProductionBatchController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\SalesOrderController;
use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\SupplierController;
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

    Route::resource('/materials', MaterialController::class)->parameters([
        'materials' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/materials/{entity}/{relation}', [MaterialController::class, 'updateRelation']);
    Route::post('/materials/list', [MaterialController::class, 'list']);

    Route::resource('/mines', MineController::class)->parameters([
        'mines' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/mines/{entity}/{relation}', [MineController::class, 'updateRelation']);
    Route::post('/mines/list', [MineController::class, 'list']);

    Route::resource('/mining-operations', MiningOperationController::class)->parameters([
        'mining-operations' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/mining-operations/{entity}/{relation}', [MiningOperationController::class, 'updateRelation']);
    Route::post('/mining-operations/list', [MiningOperationController::class, 'list']);

    Route::resource('/factories', FactoryController::class)->parameters([
        'factories' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/factories/{entity}/{relation}', [FactoryController::class, 'updateRelation']);
    Route::post('/factories/list', [FactoryController::class, 'list']);

    Route::resource('/car-models', CarModelController::class)->parameters([
        'car-models' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/car-models/{entity}/{relation}', [CarModelController::class, 'updateRelation']);
    Route::post('/car-models/list', [CarModelController::class, 'list']);

    Route::resource('/production-batches', ProductionBatchController::class)->parameters([
        'production-batches' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/production-batches/{entity}/{relation}', [ProductionBatchController::class, 'updateRelation']);
    Route::post('/production-batches/list', [ProductionBatchController::class, 'list']);

    Route::resource('/suppliers', SupplierController::class)->parameters([
        'suppliers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/suppliers/{entity}/{relation}', [SupplierController::class, 'updateRelation']);
    Route::post('/suppliers/list', [SupplierController::class, 'list']);

    Route::resource('/purchase-orders', PurchaseOrderController::class)->parameters([
        'purchase-orders' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/purchase-orders/{entity}/{relation}', [PurchaseOrderController::class, 'updateRelation']);
    Route::post('/purchase-orders/list', [PurchaseOrderController::class, 'list']);

    Route::resource('/inventories', InventoryController::class)->parameters([
        'inventories' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/inventories/{entity}/{relation}', [InventoryController::class, 'updateRelation']);
    Route::post('/inventories/list', [InventoryController::class, 'list']);

    Route::resource('/customers', CustomerController::class)->parameters([
        'customers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/customers/{entity}/{relation}', [CustomerController::class, 'updateRelation']);
    Route::post('/customers/list', [CustomerController::class, 'list']);

    Route::resource('/sales-orders', SalesOrderController::class)->parameters([
        'sales-orders' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/sales-orders/{entity}/{relation}', [SalesOrderController::class, 'updateRelation']);
    Route::post('/sales-orders/list', [SalesOrderController::class, 'list']);

    Route::resource('/shipments', ShipmentController::class)->parameters([
        'shipments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/shipments/{entity}/{relation}', [ShipmentController::class, 'updateRelation']);
    Route::post('/shipments/list', [ShipmentController::class, 'list']);
});
