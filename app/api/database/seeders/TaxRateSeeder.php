<?php

namespace Database\Seeders;

use Database\Factories\TaxRateFactory;
use Illuminate\Database\Seeder;

class TaxRateSeeder extends Seeder
{
    public function run(): void
    {
        (new TaxRateFactory)
            ->count(50)
            ->create();
    }
}
