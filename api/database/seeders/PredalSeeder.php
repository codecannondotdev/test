<?php

namespace Database\Seeders;

use Database\Factories\PredalFactory;
use Illuminate\Database\Seeder;

class PredalSeeder extends Seeder
{
    public function run(): void
    {
        (new PredalFactory)
            ->count(50)
            ->create();
    }
}
