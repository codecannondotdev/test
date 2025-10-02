<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DamageReportController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\PurchaseOrderItemController;
use App\Http\Controllers\ReturnModelController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\ShipmentItemController;
use App\Http\Controllers\ShippingMethodController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WarehouseController;
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

    Route::resource('/products', ProductController::class)->parameters([
        'products' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/products/{entity}/{relation}', [ProductController::class, 'updateRelation']);
    Route::post('/products/list', [ProductController::class, 'list']);

    Route::resource('/categories', CategoryController::class)->parameters([
        'categories' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/categories/{entity}/{relation}', [CategoryController::class, 'updateRelation']);
    Route::post('/categories/list', [CategoryController::class, 'list']);

    Route::resource('/suppliers', SupplierController::class)->parameters([
        'suppliers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/suppliers/{entity}/{relation}', [SupplierController::class, 'updateRelation']);
    Route::post('/suppliers/list', [SupplierController::class, 'list']);

    Route::resource('/customers', CustomerController::class)->parameters([
        'customers' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/customers/{entity}/{relation}', [CustomerController::class, 'updateRelation']);
    Route::post('/customers/list', [CustomerController::class, 'list']);

    Route::resource('/orders', OrderController::class)->parameters([
        'orders' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/orders/{entity}/{relation}', [OrderController::class, 'updateRelation']);
    Route::post('/orders/list', [OrderController::class, 'list']);

    Route::resource('/order-items', OrderItemController::class)->parameters([
        'order-items' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/order-items/{entity}/{relation}', [OrderItemController::class, 'updateRelation']);
    Route::post('/order-items/list', [OrderItemController::class, 'list']);

    Route::resource('/inventories', InventoryController::class)->parameters([
        'inventories' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/inventories/{entity}/{relation}', [InventoryController::class, 'updateRelation']);
    Route::post('/inventories/list', [InventoryController::class, 'list']);

    Route::resource('/warehouses', WarehouseController::class)->parameters([
        'warehouses' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/warehouses/{entity}/{relation}', [WarehouseController::class, 'updateRelation']);
    Route::post('/warehouses/list', [WarehouseController::class, 'list']);

    Route::resource('/shipments', ShipmentController::class)->parameters([
        'shipments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/shipments/{entity}/{relation}', [ShipmentController::class, 'updateRelation']);
    Route::post('/shipments/list', [ShipmentController::class, 'list']);

    Route::resource('/shipment-items', ShipmentItemController::class)->parameters([
        'shipment-items' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/shipment-items/{entity}/{relation}', [ShipmentItemController::class, 'updateRelation']);
    Route::post('/shipment-items/list', [ShipmentItemController::class, 'list']);

    Route::resource('/purchase-orders', PurchaseOrderController::class)->parameters([
        'purchase-orders' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/purchase-orders/{entity}/{relation}', [PurchaseOrderController::class, 'updateRelation']);
    Route::post('/purchase-orders/list', [PurchaseOrderController::class, 'list']);

    Route::resource('/purchase-order-items', PurchaseOrderItemController::class)->parameters([
        'purchase-order-items' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/purchase-order-items/{entity}/{relation}', [PurchaseOrderItemController::class, 'updateRelation']);
    Route::post('/purchase-order-items/list', [PurchaseOrderItemController::class, 'list']);

    Route::resource('/employees', EmployeeController::class)->parameters([
        'employees' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/employees/{entity}/{relation}', [EmployeeController::class, 'updateRelation']);
    Route::post('/employees/list', [EmployeeController::class, 'list']);

    Route::resource('/roles', RoleController::class)->parameters([
        'roles' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/roles/{entity}/{relation}', [RoleController::class, 'updateRelation']);
    Route::post('/roles/list', [RoleController::class, 'list']);

    Route::resource('/transactions', TransactionController::class)->parameters([
        'transactions' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/transactions/{entity}/{relation}', [TransactionController::class, 'updateRelation']);
    Route::post('/transactions/list', [TransactionController::class, 'list']);

    Route::resource('/payments', PaymentController::class)->parameters([
        'payments' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/payments/{entity}/{relation}', [PaymentController::class, 'updateRelation']);
    Route::post('/payments/list', [PaymentController::class, 'list']);

    Route::resource('/shipping-methods', ShippingMethodController::class)->parameters([
        'shipping-methods' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/shipping-methods/{entity}/{relation}', [ShippingMethodController::class, 'updateRelation']);
    Route::post('/shipping-methods/list', [ShippingMethodController::class, 'list']);

    Route::resource('/locations', LocationController::class)->parameters([
        'locations' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/locations/{entity}/{relation}', [LocationController::class, 'updateRelation']);
    Route::post('/locations/list', [LocationController::class, 'list']);

    Route::resource('/damage-reports', DamageReportController::class)->parameters([
        'damage-reports' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/damage-reports/{entity}/{relation}', [DamageReportController::class, 'updateRelation']);
    Route::post('/damage-reports/list', [DamageReportController::class, 'list']);

    Route::resource('/returns', ReturnModelController::class)->parameters([
        'returns' => 'entity',
    ])->except('index', 'create', 'edit');
    Route::put('/returns/{entity}/{relation}', [ReturnModelController::class, 'updateRelation']);
    Route::post('/returns/list', [ReturnModelController::class, 'list']);
});
