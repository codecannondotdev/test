<?php

namespace Database\Seeders;

use Database\Factories\ProductionBatchFactory;
use Illuminate\Database\Seeder;

class ProductionBatchSeeder extends Seeder
{
    public function run(): void
    {
        (new ProductionBatchFactory)
            ->count(50)
            ->create();
    }
}
