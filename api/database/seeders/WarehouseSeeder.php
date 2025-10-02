<?php

namespace Database\Seeders;

use Database\Factories\WarehouseFactory;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        (new WarehouseFactory)
            ->count(50)
            ->create();
    }
}
