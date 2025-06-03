<?php

namespace Database\Seeders;

use App\Models\MiningOperation;
use Illuminate\Database\Seeder;

class MiningOperationSeeder extends Seeder
{
    public function run(): void
    {
        MiningOperation::factory()
            ->count(50)
            ->create();
    }
}
