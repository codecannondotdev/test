<?php

namespace Database\Seeders;

use Database\Factories\PrescriptionFactory;
use Illuminate\Database\Seeder;

class PrescriptionSeeder extends Seeder
{
    public function run(): void
    {
        (new PrescriptionFactory)
            ->count(50)
            ->create();
    }
}
