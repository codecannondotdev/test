<?php

namespace Database\Seeders;

use Database\Factories\ActivityLogFactory;
use Illuminate\Database\Seeder;

class ActivityLogSeeder extends Seeder
{
    public function run(): void
    {
        (new ActivityLogFactory)
            ->count(50)
            ->create();
    }
}
