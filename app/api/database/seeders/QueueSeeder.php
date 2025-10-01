<?php

namespace Database\Seeders;

use Database\Factories\QueueFactory;
use Illuminate\Database\Seeder;

class QueueSeeder extends Seeder
{
    public function run(): void
    {
        (new QueueFactory)
            ->count(50)
            ->create();
    }
}
