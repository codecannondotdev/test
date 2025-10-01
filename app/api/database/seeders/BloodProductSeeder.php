<?php

namespace Database\Seeders;

use Database\Factories\BloodProductFactory;
use Illuminate\Database\Seeder;

class BloodProductSeeder extends Seeder
{
    public function run(): void
    {
        (new BloodProductFactory)
            ->count(50)
            ->create();
    }
}
