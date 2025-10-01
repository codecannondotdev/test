<?php

namespace Database\Seeders;

use Database\Factories\DietOrderFactory;
use Illuminate\Database\Seeder;

class DietOrderSeeder extends Seeder
{
    public function run(): void
    {
        (new DietOrderFactory)
            ->count(50)
            ->create();
    }
}
