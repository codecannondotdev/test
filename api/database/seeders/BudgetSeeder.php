<?php

namespace Database\Seeders;

use Database\Factories\BudgetFactory;
use Illuminate\Database\Seeder;

class BudgetSeeder extends Seeder
{
    public function run(): void
    {
        (new BudgetFactory)
            ->count(50)
            ->create();
    }
}
