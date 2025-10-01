<?php

namespace Database\Seeders;

use Database\Factories\TestResultFactory;
use Illuminate\Database\Seeder;

class TestResultSeeder extends Seeder
{
    public function run(): void
    {
        (new TestResultFactory)
            ->count(50)
            ->create();
    }
}
