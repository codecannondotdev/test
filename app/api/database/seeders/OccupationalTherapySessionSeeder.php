<?php

namespace Database\Seeders;

use Database\Factories\OccupationalTherapySessionFactory;
use Illuminate\Database\Seeder;

class OccupationalTherapySessionSeeder extends Seeder
{
    public function run(): void
    {
        (new OccupationalTherapySessionFactory)
            ->count(50)
            ->create();
    }
}
