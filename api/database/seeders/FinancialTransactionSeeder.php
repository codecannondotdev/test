<?php

namespace Database\Seeders;

use Database\Factories\FinancialTransactionFactory;
use Illuminate\Database\Seeder;

class FinancialTransactionSeeder extends Seeder
{
    public function run(): void
    {
        (new FinancialTransactionFactory)
            ->count(50)
            ->create();
    }
}
