<?php

namespace Database\Seeders;

use Database\Factories\DiagnosisFactory;
use Illuminate\Database\Seeder;

class DiagnosisSeeder extends Seeder
{
    public function run(): void
    {
        (new DiagnosisFactory)
            ->count(50)
            ->create();
    }
}
