<?php

namespace Database\Seeders;

use Database\Factories\SettingsFactory;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        (new SettingsFactory)
            ->count(50)
            ->create();
    }
}
