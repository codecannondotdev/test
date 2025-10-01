<?php

namespace Database\Seeders;

use Database\Factories\CarePlanFactory;
use Illuminate\Database\Seeder;

class CarePlanSeeder extends Seeder
{
    public function run(): void
    {
        (new CarePlanFactory)
            ->count(50)
            ->create();
    }
}
