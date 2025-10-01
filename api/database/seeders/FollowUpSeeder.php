<?php

namespace Database\Seeders;

use Database\Factories\FollowUpFactory;
use Illuminate\Database\Seeder;

class FollowUpSeeder extends Seeder
{
    public function run(): void
    {
        (new FollowUpFactory)
            ->count(50)
            ->create();
    }
}
