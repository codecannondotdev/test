<?php

namespace Database\Seeders;

use Database\Factories\OrderItemFactory;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    public function run(): void
    {
        (new OrderItemFactory)
            ->count(50)
            ->create();
    }
}
