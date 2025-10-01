<?php

namespace Database\Seeders;

use Database\Factories\FacilityFactory;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    public function run(): void
    {
        (new FacilityFactory)
            ->count(50)
            ->create();
    }
}
