<?php

namespace Database\Seeders;

use Database\Factories\ShipmentFactory;
use Illuminate\Database\Seeder;

class ShipmentSeeder extends Seeder
{
    public function run(): void
    {
        (new ShipmentFactory)
            ->count(50)
            ->create();
    }
}
