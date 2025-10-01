<?php

namespace Database\Seeders;

use Database\Factories\RiskAssessmentFactory;
use Illuminate\Database\Seeder;

class RiskAssessmentSeeder extends Seeder
{
    public function run(): void
    {
        (new RiskAssessmentFactory)
            ->count(50)
            ->create();
    }
}
