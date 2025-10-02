<?php

namespace Database\Seeders;

use Database\Factories\LocationFactory;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        (new LocationFactory)
            ->count(50)
            ->create();
    }
}
