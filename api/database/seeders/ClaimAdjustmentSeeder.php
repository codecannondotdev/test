<?php

namespace Database\Seeders;

use Database\Factories\ClaimAdjustmentFactory;
use Illuminate\Database\Seeder;

class ClaimAdjustmentSeeder extends Seeder
{
    public function run(): void
    {
        (new ClaimAdjustmentFactory)
            ->count(50)
            ->create();
    }
}
