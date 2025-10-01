<?php

namespace Database\Seeders;

use Database\Factories\StaffCredentialFactory;
use Illuminate\Database\Seeder;

class StaffCredentialSeeder extends Seeder
{
    public function run(): void
    {
        (new StaffCredentialFactory)
            ->count(50)
            ->create();
    }
}
