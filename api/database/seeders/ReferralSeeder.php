<?php

namespace Database\Seeders;

use Database\Factories\ReferralFactory;
use Illuminate\Database\Seeder;

class ReferralSeeder extends Seeder
{
    public function run(): void
    {
        (new ReferralFactory)
            ->count(50)
            ->create();
    }
}
