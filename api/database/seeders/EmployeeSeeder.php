<?php

namespace Database\Seeders;

use Database\Factories\EmployeeFactory;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        (new EmployeeFactory)
            ->count(50)
            ->create();
    }
}
