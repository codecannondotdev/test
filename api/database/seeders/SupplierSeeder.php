<?php

namespace Database\Seeders;

use Database\Factories\SupplierFactory;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        (new SupplierFactory)
            ->count(50)
            ->create();
    }
}
