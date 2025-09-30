<?php

namespace Database\Seeders;

use Database\Factories\TrainerFactory;
use Illuminate\Database\Seeder;

class TrainerSeeder extends Seeder
{
    public function run(): void
    {
        (new TrainerFactory)
            ->count(50)
            ->create();
    }
}
