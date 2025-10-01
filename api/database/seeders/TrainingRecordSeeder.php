<?php

namespace Database\Seeders;

use Database\Factories\TrainingRecordFactory;
use Illuminate\Database\Seeder;

class TrainingRecordSeeder extends Seeder
{
    public function run(): void
    {
        (new TrainingRecordFactory)
            ->count(50)
            ->create();
    }
}
