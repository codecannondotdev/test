<?php

namespace Database\Seeders;

use Database\Factories\HospiceCareFactory;
use Illuminate\Database\Seeder;

class HospiceCareSeeder extends Seeder
{
    public function run(): void
    {
        (new HospiceCareFactory)
            ->count(50)
            ->create();
    }
}
