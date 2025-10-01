<?php

namespace Database\Seeders;

use Database\Factories\GrowthChartFactory;
use Illuminate\Database\Seeder;

class GrowthChartSeeder extends Seeder
{
    public function run(): void
    {
        (new GrowthChartFactory)
            ->count(50)
            ->create();
    }
}
