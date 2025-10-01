<?php

namespace Database\Seeders;

use Database\Factories\LegalHoldFactory;
use Illuminate\Database\Seeder;

class LegalHoldSeeder extends Seeder
{
    public function run(): void
    {
        (new LegalHoldFactory)
            ->count(50)
            ->create();
    }
}
