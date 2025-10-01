<?php

namespace Database\Seeders;

use Database\Factories\SampleFactory;
use Illuminate\Database\Seeder;

class SampleSeeder extends Seeder
{
    public function run(): void
    {
        (new SampleFactory)
            ->count(50)
            ->create();
    }
}
