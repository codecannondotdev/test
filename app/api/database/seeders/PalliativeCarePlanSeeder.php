<?php

namespace Database\Seeders;

use Database\Factories\PalliativeCarePlanFactory;
use Illuminate\Database\Seeder;

class PalliativeCarePlanSeeder extends Seeder
{
    public function run(): void
    {
        (new PalliativeCarePlanFactory)
            ->count(50)
            ->create();
    }
}
