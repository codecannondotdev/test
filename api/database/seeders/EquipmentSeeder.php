<?php

namespace Database\Seeders;

use Database\Factories\EquipmentFactory;
use Illuminate\Database\Seeder;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        (new EquipmentFactory)
            ->count(50)
            ->create();
    }
}
