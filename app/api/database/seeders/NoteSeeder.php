<?php

namespace Database\Seeders;

use Database\Factories\NoteFactory;
use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    public function run(): void
    {
        (new NoteFactory)
            ->count(50)
            ->create();
    }
}
