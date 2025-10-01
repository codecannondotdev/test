<?php

namespace Database\Seeders;

use Database\Factories\RadiologyReportFactory;
use Illuminate\Database\Seeder;

class RadiologyReportSeeder extends Seeder
{
    public function run(): void
    {
        (new RadiologyReportFactory)
            ->count(50)
            ->create();
    }
}
