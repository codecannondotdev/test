<?php

namespace Database\Seeders;

use Database\Factories\PaymentFactory;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        (new PaymentFactory)
            ->count(50)
            ->create();
    }
}
