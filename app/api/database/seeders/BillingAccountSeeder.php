<?php

namespace Database\Seeders;

use Database\Factories\BillingAccountFactory;
use Illuminate\Database\Seeder;

class BillingAccountSeeder extends Seeder
{
    public function run(): void
    {
        (new BillingAccountFactory)
            ->count(50)
            ->create();
    }
}
