<?php

namespace Database\Seeders;

use Database\Factories\GeoLocationFactory;
use Illuminate\Database\Seeder;

class GeoLocationSeeder extends Seeder
{
    public function run(): void
    {
        (new GeoLocationFactory)
            ->count(50)
            ->create();
    }
}
