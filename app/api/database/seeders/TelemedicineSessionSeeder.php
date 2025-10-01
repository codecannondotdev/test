<?php

namespace Database\Seeders;

use Database\Factories\TelemedicineSessionFactory;
use Illuminate\Database\Seeder;

class TelemedicineSessionSeeder extends Seeder
{
    public function run(): void
    {
        (new TelemedicineSessionFactory)
            ->count(50)
            ->create();
    }
}
