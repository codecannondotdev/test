<?php

namespace Database\Seeders;

use Database\Factories\MemberFactory;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    public function run(): void
    {
        (new MemberFactory)
            ->count(50)
            ->create();
    }
}
