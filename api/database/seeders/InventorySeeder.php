<?php

namespace Database\Seeders;

use Database\Factories\InventoryFactory;
use Illuminate\Database\Seeder;

class InventorySeeder extends Seeder
{
    public function run(): void
    {
        (new InventoryFactory)
            ->count(50)
            ->create();
    }
}
