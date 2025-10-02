<?php

namespace Database\Seeders;

use Database\Factories\ShippingMethodFactory;
use Illuminate\Database\Seeder;

class ShippingMethodSeeder extends Seeder
{
    public function run(): void
    {
        (new ShippingMethodFactory)
            ->count(50)
            ->create();
    }
}
