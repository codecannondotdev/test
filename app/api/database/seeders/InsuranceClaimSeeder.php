<?php

namespace Database\Seeders;

use Database\Factories\InsuranceClaimFactory;
use Illuminate\Database\Seeder;

class InsuranceClaimSeeder extends Seeder
{
    public function run(): void
    {
        (new InsuranceClaimFactory)
            ->count(50)
            ->create();
    }
}
