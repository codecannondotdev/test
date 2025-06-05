<?php

namespace Database\Seeders;

use Database\Factories\MiningOperationFactory;
use Illuminate\Database\Seeder;

class MiningOperationSeeder extends Seeder
{
    public function run(): void
    {
        (new MiningOperationFactory)
            ->count(50)
            ->create();
    }
}
