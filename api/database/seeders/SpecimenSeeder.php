<?php

namespace Database\Seeders;

use Database\Factories\SpecimenFactory;
use Illuminate\Database\Seeder;

class SpecimenSeeder extends Seeder
{
    public function run(): void
    {
        (new SpecimenFactory)
            ->count(50)
            ->create();
    }
}
