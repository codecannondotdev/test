<?php

namespace Database\Seeders;

use Database\Factories\IntegrationFactory;
use Illuminate\Database\Seeder;

class IntegrationSeeder extends Seeder
{
    public function run(): void
    {
        (new IntegrationFactory)
            ->count(50)
            ->create();
    }
}
