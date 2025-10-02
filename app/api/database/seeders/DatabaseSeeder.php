<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::count() > 0) {
            return;
        }
        $this->call([UserSeeder::class, ProductSeeder::class, CategorySeeder::class, SupplierSeeder::class, CustomerSeeder::class, OrderSeeder::class, OrderItemSeeder::class, InventorySeeder::class, WarehouseSeeder::class, ShipmentSeeder::class, ShipmentItemSeeder::class, PurchaseOrderSeeder::class, PurchaseOrderItemSeeder::class, EmployeeSeeder::class, RoleSeeder::class, TransactionSeeder::class, PaymentSeeder::class, ShippingMethodSeeder::class, LocationSeeder::class, DamageReportSeeder::class, ReturnModelSeeder::class]);
    }
}
