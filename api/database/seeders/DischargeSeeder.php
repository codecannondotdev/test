<?php

namespace Database\Seeders;

use Database\Factories\DischargeFactory;
use Illuminate\Database\Seeder;

class DischargeSeeder extends Seeder
{
    public function run(): void
    {
        (new DischargeFactory)
            ->count(50)
            ->create();
    }
}
