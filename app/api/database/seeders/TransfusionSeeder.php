<?php

namespace Database\Seeders;

use Database\Factories\TransfusionFactory;
use Illuminate\Database\Seeder;

class TransfusionSeeder extends Seeder
{
    public function run(): void
    {
        (new TransfusionFactory)
            ->count(50)
            ->create();
    }
}
