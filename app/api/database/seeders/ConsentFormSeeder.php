<?php

namespace Database\Seeders;

use Database\Factories\ConsentFormFactory;
use Illuminate\Database\Seeder;

class ConsentFormSeeder extends Seeder
{
    public function run(): void
    {
        (new ConsentFormFactory)
            ->count(50)
            ->create();
    }
}
