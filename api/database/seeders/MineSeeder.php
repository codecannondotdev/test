<?php

namespace Database\Seeders;

use Database\Factories\MineFactory;
use Illuminate\Database\Seeder;

class MineSeeder extends Seeder
{
    public function run(): void
    {
        (new MineFactory)
            ->count(50)
            ->create();
    }
}
