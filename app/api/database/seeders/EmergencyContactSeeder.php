<?php

namespace Database\Seeders;

use Database\Factories\EmergencyContactFactory;
use Illuminate\Database\Seeder;

class EmergencyContactSeeder extends Seeder
{
    public function run(): void
    {
        (new EmergencyContactFactory)
            ->count(50)
            ->create();
    }
}
