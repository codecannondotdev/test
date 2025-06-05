<?php

namespace Database\Seeders;

use Database\Factories\PurchaseOrderFactory;
use Illuminate\Database\Seeder;

class PurchaseOrderSeeder extends Seeder
{
    public function run(): void
    {
        (new PurchaseOrderFactory)
            ->count(50)
            ->create();
    }
}
