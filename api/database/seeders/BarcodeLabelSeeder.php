<?php

namespace Database\Seeders;

use Database\Factories\BarcodeLabelFactory;
use Illuminate\Database\Seeder;

class BarcodeLabelSeeder extends Seeder
{
    public function run(): void
    {
        (new BarcodeLabelFactory)
            ->count(50)
            ->create();
    }
}
