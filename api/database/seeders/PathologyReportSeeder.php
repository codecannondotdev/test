<?php

namespace Database\Seeders;

use Database\Factories\PathologyReportFactory;
use Illuminate\Database\Seeder;

class PathologyReportSeeder extends Seeder
{
    public function run(): void
    {
        (new PathologyReportFactory)
            ->count(50)
            ->create();
    }
}
