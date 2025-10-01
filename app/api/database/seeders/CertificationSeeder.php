<?php

namespace Database\Seeders;

use Database\Factories\CertificationFactory;
use Illuminate\Database\Seeder;

class CertificationSeeder extends Seeder
{
    public function run(): void
    {
        (new CertificationFactory)
            ->count(50)
            ->create();
    }
}
