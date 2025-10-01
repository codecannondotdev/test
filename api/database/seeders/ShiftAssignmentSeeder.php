<?php

namespace Database\Seeders;

use Database\Factories\ShiftAssignmentFactory;
use Illuminate\Database\Seeder;

class ShiftAssignmentSeeder extends Seeder
{
    public function run(): void
    {
        (new ShiftAssignmentFactory)
            ->count(50)
            ->create();
    }
}
