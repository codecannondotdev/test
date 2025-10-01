<?php

namespace Database\Seeders;

use Database\Factories\PaymentMethodFactory;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        (new PaymentMethodFactory)
            ->count(50)
            ->create();
    }
}
