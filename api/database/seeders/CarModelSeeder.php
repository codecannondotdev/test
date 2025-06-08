<?php

namespace Database\Seeders;

use Database\Factories\CarModelFactory;
use Illuminate\Database\Seeder;

class CarModelSeeder extends Seeder
{
    public function run(): void
    {
        (new CarModelFactory)
            ->count(50)
            ->create();
    }
}
