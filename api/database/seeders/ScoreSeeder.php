<?php

namespace Database\Seeders;

use Database\Factories\ScoreFactory;
use Illuminate\Database\Seeder;

class ScoreSeeder extends Seeder
{
    public function run(): void
    {
        (new ScoreFactory)
            ->count(50)
            ->create();
    }
}
