<?php

namespace Database\Seeders;

use Database\Factories\VaccineRecordFactory;
use Illuminate\Database\Seeder;

class VaccineRecordSeeder extends Seeder
{
    public function run(): void
    {
        (new VaccineRecordFactory)
            ->count(50)
            ->create();
    }
}
