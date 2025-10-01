<?php

namespace Database\Seeders;

use Database\Factories\ReferralSourceFactory;
use Illuminate\Database\Seeder;

class ReferralSourceSeeder extends Seeder
{
    public function run(): void
    {
        (new ReferralSourceFactory)
            ->count(50)
            ->create();
    }
}
