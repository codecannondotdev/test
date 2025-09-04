<?php

namespace Database\Seeders;

use Database\Factories\StudioFactory;
use Illuminate\Database\Seeder;

class StudioSeeder extends Seeder
{
    public function run(): void
    {
        (new StudioFactory)
            ->count(50)
            ->create();
    }
}
