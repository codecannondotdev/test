<?php

namespace Database\Seeders;

use Database\Factories\NutritionalPlanFactory;
use Illuminate\Database\Seeder;

class NutritionalPlanSeeder extends Seeder
{
    public function run(): void
    {
        (new NutritionalPlanFactory)
            ->count(50)
            ->create();
    }
}
