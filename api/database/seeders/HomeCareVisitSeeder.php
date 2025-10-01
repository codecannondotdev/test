<?php

namespace Database\Seeders;

use Database\Factories\HomeCareVisitFactory;
use Illuminate\Database\Seeder;

class HomeCareVisitSeeder extends Seeder
{
    public function run(): void
    {
        (new HomeCareVisitFactory)
            ->count(50)
            ->create();
    }
}
