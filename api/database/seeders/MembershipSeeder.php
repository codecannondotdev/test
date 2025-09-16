<?php

namespace Database\Seeders;

use Database\Factories\MembershipFactory;
use Illuminate\Database\Seeder;

class MembershipSeeder extends Seeder
{
    public function run(): void
    {
        (new MembershipFactory)
            ->count(50)
            ->create();
    }
}
