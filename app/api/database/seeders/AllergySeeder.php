<?php

namespace Database\Seeders;

use Database\Factories\AllergyFactory;
use Illuminate\Database\Seeder;

class AllergySeeder extends Seeder
{
    public function run(): void
    {
        (new AllergyFactory)
            ->count(50)
            ->create();
    }
}
