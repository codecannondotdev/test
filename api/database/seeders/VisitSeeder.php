<?php

namespace Database\Seeders;

use Database\Factories\VisitFactory;
use Illuminate\Database\Seeder;

class VisitSeeder extends Seeder
{
    public function run(): void
    {
        (new VisitFactory)
            ->count(50)
            ->create();
    }
}
