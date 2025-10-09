<?php

namespace Database\Seeders;

use Database\Factories\CurrencyFactory;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    public function run(): void
    {
        (new CurrencyFactory)
            ->count(50)
            ->create();
    }
}
