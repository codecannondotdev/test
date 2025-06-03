<?php

namespace Database\Seeders;

use App\Models\ProductionBatch;
use Illuminate\Database\Seeder;

class ProductionBatchSeeder extends Seeder
{
    public function run(): void
    {
        ProductionBatch::factory()
            ->count(50)
            ->create();
    }
}
