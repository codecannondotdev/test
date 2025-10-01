<?php

namespace Database\Seeders;

use Database\Factories\APIKeyFactory;
use Illuminate\Database\Seeder;

class APIKeySeeder extends Seeder
{
    public function run(): void
    {
        (new APIKeyFactory)
            ->count(50)
            ->create();
    }
}
