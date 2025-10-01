<?php

namespace Database\Seeders;

use Database\Factories\AutopsyReportFactory;
use Illuminate\Database\Seeder;

class AutopsyReportSeeder extends Seeder
{
    public function run(): void
    {
        (new AutopsyReportFactory)
            ->count(50)
            ->create();
    }
}
