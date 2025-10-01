<?php

namespace Database\Seeders;

use Database\Factories\SocialWorkNoteFactory;
use Illuminate\Database\Seeder;

class SocialWorkNoteSeeder extends Seeder
{
    public function run(): void
    {
        (new SocialWorkNoteFactory)
            ->count(50)
            ->create();
    }
}
