<?php

namespace Database\Seeders;

use Database\Factories\SessionFactory;
use Illuminate\Database\Seeder;

class SessionSeeder extends Seeder
{
    public function run(): void
    {
        (new SessionFactory)
            ->count(50)
            ->create();
    }
}
