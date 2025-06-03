<?php

namespace Database\Seeders;

use App\Models\Factory;
use Illuminate\Database\Seeder;

class FactorySeeder extends Seeder
{
    public function run(): void
    {
        Factory::factory()
            ->count(50)
            ->create();
    }
}
