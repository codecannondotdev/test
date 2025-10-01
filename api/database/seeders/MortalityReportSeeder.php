<?php

namespace Database\Seeders;

use Database\Factories\MortalityReportFactory;
use Illuminate\Database\Seeder;

class MortalityReportSeeder extends Seeder
{
    public function run(): void
    {
        (new MortalityReportFactory)
            ->count(50)
            ->create();
    }
}
