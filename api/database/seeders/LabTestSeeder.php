<?php

namespace Database\Seeders;

use Database\Factories\LabTestFactory;
use Illuminate\Database\Seeder;

class LabTestSeeder extends Seeder
{
    public function run(): void
    {
        (new LabTestFactory)
            ->count(50)
            ->create();
    }
}
