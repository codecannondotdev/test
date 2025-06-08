<?php

namespace Database\Seeders;

use Database\Factories\FactoryFactory;
use Illuminate\Database\Seeder;

class FactorySeeder extends Seeder
{
    public function run(): void
    {
        (new FactoryFactory)
            ->count(50)
            ->create();
    }
}
