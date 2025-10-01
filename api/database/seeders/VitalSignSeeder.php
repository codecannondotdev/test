<?php

namespace Database\Seeders;

use Database\Factories\VitalSignFactory;
use Illuminate\Database\Seeder;

class VitalSignSeeder extends Seeder
{
    public function run(): void
    {
        (new VitalSignFactory)
            ->count(50)
            ->create();
    }
}
