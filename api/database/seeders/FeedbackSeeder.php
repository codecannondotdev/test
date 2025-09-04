<?php

namespace Database\Seeders;

use Database\Factories\FeedbackFactory;
use Illuminate\Database\Seeder;

class FeedbackSeeder extends Seeder
{
    public function run(): void
    {
        (new FeedbackFactory)
            ->count(50)
            ->create();
    }
}
