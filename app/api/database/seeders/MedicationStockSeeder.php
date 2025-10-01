<?php

namespace Database\Seeders;

use Database\Factories\MedicationStockFactory;
use Illuminate\Database\Seeder;

class MedicationStockSeeder extends Seeder
{
    public function run(): void
    {
        (new MedicationStockFactory)
            ->count(50)
            ->create();
    }
}
