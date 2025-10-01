<?php

namespace Database\Seeders;

use Database\Factories\AppointmentTypeFactory;
use Illuminate\Database\Seeder;

class AppointmentTypeSeeder extends Seeder
{
    public function run(): void
    {
        (new AppointmentTypeFactory)
            ->count(50)
            ->create();
    }
}
