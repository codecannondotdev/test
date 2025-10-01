<?php

namespace Database\Seeders;

use Database\Factories\AdmissionFactory;
use Illuminate\Database\Seeder;

class AdmissionSeeder extends Seeder
{
    public function run(): void
    {
        (new AdmissionFactory)
            ->count(50)
            ->create();
    }
}
