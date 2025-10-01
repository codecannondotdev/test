<?php

namespace Database\Seeders;

use Database\Factories\WaitingListFactory;
use Illuminate\Database\Seeder;

class WaitingListSeeder extends Seeder
{
    public function run(): void
    {
        (new WaitingListFactory)
            ->count(50)
            ->create();
    }
}
