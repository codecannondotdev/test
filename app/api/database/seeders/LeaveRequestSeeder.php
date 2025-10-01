<?php

namespace Database\Seeders;

use Database\Factories\LeaveRequestFactory;
use Illuminate\Database\Seeder;

class LeaveRequestSeeder extends Seeder
{
    public function run(): void
    {
        (new LeaveRequestFactory)
            ->count(50)
            ->create();
    }
}
