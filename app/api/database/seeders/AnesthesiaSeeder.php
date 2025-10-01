<?php

namespace Database\Seeders;

use Database\Factories\AnesthesiaFactory;
use Illuminate\Database\Seeder;

class AnesthesiaSeeder extends Seeder
{
    public function run(): void
    {
        (new AnesthesiaFactory)
            ->count(50)
            ->create();
    }
}
