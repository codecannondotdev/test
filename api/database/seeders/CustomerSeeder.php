<?php

namespace Database\Seeders;

use Database\Factories\CustomerFactory;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        (new CustomerFactory)
            ->count(50)
            ->create();
    }
}
