<?php

namespace Database\Seeders;

use Database\Factories\ClassModelFactory;
use Illuminate\Database\Seeder;

class ClassModelSeeder extends Seeder
{
    public function run(): void
    {
        (new ClassModelFactory)
            ->count(50)
            ->create();
    }
}
