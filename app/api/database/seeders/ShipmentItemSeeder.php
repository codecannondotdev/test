<?php

namespace Database\Seeders;

use Database\Factories\ShipmentItemFactory;
use Illuminate\Database\Seeder;

class ShipmentItemSeeder extends Seeder
{
    public function run(): void
    {
        (new ShipmentItemFactory)
            ->count(50)
            ->create();
    }
}
