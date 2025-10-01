<?php

namespace Database\Seeders;

use Database\Factories\ScreeningFactory;
use Illuminate\Database\Seeder;

class ScreeningSeeder extends Seeder
{
    public function run(): void
    {
        (new ScreeningFactory)
            ->count(50)
            ->create();
    }
}
