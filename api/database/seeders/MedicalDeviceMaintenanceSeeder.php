<?php

namespace Database\Seeders;

use Database\Factories\MedicalDeviceMaintenanceFactory;
use Illuminate\Database\Seeder;

class MedicalDeviceMaintenanceSeeder extends Seeder
{
    public function run(): void
    {
        (new MedicalDeviceMaintenanceFactory)
            ->count(50)
            ->create();
    }
}
