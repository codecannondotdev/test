<?php

namespace Database\Seeders;

use Database\Factories\TesterFactory;
use Illuminate\Database\Seeder;

class TesterSeeder extends Seeder
{
    public function run(): void
    {
        (new TesterFactory)
            ->count(50)
            ->create();
    }
}
