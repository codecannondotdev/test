<?php

namespace Database\Seeders;

use Database\Factories\ProgramFactory;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        (new ProgramFactory)
            ->count(50)
            ->create();
    }
}
