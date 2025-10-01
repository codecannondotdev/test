<?php

namespace Database\Seeders;

use Database\Factories\ProcurementOrderFactory;
use Illuminate\Database\Seeder;

class ProcurementOrderSeeder extends Seeder
{
    public function run(): void
    {
        (new ProcurementOrderFactory)
            ->count(50)
            ->create();
    }
}
