<?php

namespace Database\Seeders;

use Database\Factories\AttendanceFactory;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        (new AttendanceFactory)
            ->count(50)
            ->create();
    }
}
