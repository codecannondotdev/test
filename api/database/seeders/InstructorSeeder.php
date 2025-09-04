<?php

namespace Database\Seeders;

use Database\Factories\InstructorFactory;
use Illuminate\Database\Seeder;

class InstructorSeeder extends Seeder
{
    public function run(): void
    {
        (new InstructorFactory)
            ->count(50)
            ->create();
    }
}
