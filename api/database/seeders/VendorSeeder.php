<?php

namespace Database\Seeders;

use Database\Factories\VendorFactory;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    public function run(): void
    {
        (new VendorFactory)
            ->count(50)
            ->create();
    }
}
