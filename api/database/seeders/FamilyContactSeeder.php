<?php

namespace Database\Seeders;

use Database\Factories\FamilyContactFactory;
use Illuminate\Database\Seeder;

class FamilyContactSeeder extends Seeder
{
    public function run(): void
    {
        (new FamilyContactFactory)
            ->count(50)
            ->create();
    }
}
