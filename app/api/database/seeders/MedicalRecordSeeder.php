<?php

namespace Database\Seeders;

use Database\Factories\MedicalRecordFactory;
use Illuminate\Database\Seeder;

class MedicalRecordSeeder extends Seeder
{
    public function run(): void
    {
        (new MedicalRecordFactory)
            ->count(50)
            ->create();
    }
}
