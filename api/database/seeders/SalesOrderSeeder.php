<?php

namespace Database\Seeders;

use Database\Factories\SalesOrderFactory;
use Illuminate\Database\Seeder;

class SalesOrderSeeder extends Seeder
{
    public function run(): void
    {
        (new SalesOrderFactory)
            ->count(50)
            ->create();
    }
}
