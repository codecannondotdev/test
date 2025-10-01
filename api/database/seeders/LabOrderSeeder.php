<?php

namespace Database\Seeders;

use Database\Factories\LabOrderFactory;
use Illuminate\Database\Seeder;

class LabOrderSeeder extends Seeder
{
    public function run(): void
    {
        (new LabOrderFactory)
            ->count(50)
            ->create();
    }
}
