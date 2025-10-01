<?php

namespace Database\Seeders;

use Database\Factories\ConsentFactory;
use Illuminate\Database\Seeder;

class ConsentSeeder extends Seeder
{
    public function run(): void
    {
        (new ConsentFactory)
            ->count(50)
            ->create();
    }
}
