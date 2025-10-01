<?php

namespace Database\Seeders;

use Database\Factories\BillingItemFactory;
use Illuminate\Database\Seeder;

class BillingItemSeeder extends Seeder
{
    public function run(): void
    {
        (new BillingItemFactory)
            ->count(50)
            ->create();
    }
}
