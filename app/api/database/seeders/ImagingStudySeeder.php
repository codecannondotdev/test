<?php

namespace Database\Seeders;

use Database\Factories\ImagingStudyFactory;
use Illuminate\Database\Seeder;

class ImagingStudySeeder extends Seeder
{
    public function run(): void
    {
        (new ImagingStudyFactory)
            ->count(50)
            ->create();
    }
}
