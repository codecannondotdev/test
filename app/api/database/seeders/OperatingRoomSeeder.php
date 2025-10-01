<?php

namespace Database\Seeders;

use Database\Factories\OperatingRoomFactory;
use Illuminate\Database\Seeder;

class OperatingRoomSeeder extends Seeder
{
    public function run(): void
    {
        (new OperatingRoomFactory)
            ->count(50)
            ->create();
    }
}
