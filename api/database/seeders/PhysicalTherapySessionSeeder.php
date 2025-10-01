<?php

namespace Database\Seeders;

use Database\Factories\PhysicalTherapySessionFactory;
use Illuminate\Database\Seeder;

class PhysicalTherapySessionSeeder extends Seeder
{
    public function run(): void
    {
        (new PhysicalTherapySessionFactory)
            ->count(50)
            ->create();
    }
}
