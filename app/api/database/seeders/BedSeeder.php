<?php

namespace Database\Seeders;

use Database\Factories\BedFactory;
use Illuminate\Database\Seeder;

class BedSeeder extends Seeder
{
    public function run(): void
    {
        (new BedFactory)
            ->count(50)
            ->create();
    }
}
