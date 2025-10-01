<?php

namespace Database\Seeders;

use Database\Factories\DocumentFactory;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    public function run(): void
    {
        (new DocumentFactory)
            ->count(50)
            ->create();
    }
}
