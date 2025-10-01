<?php

namespace Database\Seeders;

use Database\Factories\DICOMInstanceFactory;
use Illuminate\Database\Seeder;

class DICOMInstanceSeeder extends Seeder
{
    public function run(): void
    {
        (new DICOMInstanceFactory)
            ->count(50)
            ->create();
    }
}
