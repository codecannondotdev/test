<?php

namespace Database\Seeders;

use Database\Factories\DischargeSummaryFactory;
use Illuminate\Database\Seeder;

class DischargeSummarySeeder extends Seeder
{
    public function run(): void
    {
        (new DischargeSummaryFactory)
            ->count(50)
            ->create();
    }
}
