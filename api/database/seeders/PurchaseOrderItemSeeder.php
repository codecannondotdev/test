<?php

namespace Database\Seeders;

use Database\Factories\PurchaseOrderItemFactory;
use Illuminate\Database\Seeder;

class PurchaseOrderItemSeeder extends Seeder
{
    public function run(): void
    {
        (new PurchaseOrderItemFactory)
            ->count(50)
            ->create();
    }
}
