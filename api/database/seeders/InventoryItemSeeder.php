<?php

namespace Database\Seeders;

use Database\Factories\InventoryItemFactory;
use Illuminate\Database\Seeder;

class InventoryItemSeeder extends Seeder
{
    public function run(): void
    {
        (new InventoryItemFactory)
            ->count(50)
            ->create();
    }
}
