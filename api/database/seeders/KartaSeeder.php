<?php

namespace Database\Seeders;

use Database\Factories\KartaFactory;
use Illuminate\Database\Seeder;

class KartaSeeder extends Seeder
{
    public function run(): void
    {
        (new KartaFactory)
            ->count(50)
            ->create();
    }
}
