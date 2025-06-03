<?php

namespace Database\Seeders;

use App\Models\SalesOrder;
use Illuminate\Database\Seeder;

class SalesOrderSeeder extends Seeder
{
    public function run(): void
    {
        SalesOrder::factory()
            ->count(50)
            ->create();
    }
}
