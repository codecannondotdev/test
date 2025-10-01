<?php

namespace Database\Seeders;

use Database\Factories\HL7MessageFactory;
use Illuminate\Database\Seeder;

class HL7MessageSeeder extends Seeder
{
    public function run(): void
    {
        (new HL7MessageFactory)
            ->count(50)
            ->create();
    }
}
