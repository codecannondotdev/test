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
        $this->call([UserSeeder::class, MaterialSeeder::class, MineSeeder::class, MiningOperationSeeder::class, FactorySeeder::class, CarModelSeeder::class, ProductionBatchSeeder::class, SupplierSeeder::class, PurchaseOrderSeeder::class, InventorySeeder::class, CustomerSeeder::class, SalesOrderSeeder::class, ShipmentSeeder::class]);
    }
}
