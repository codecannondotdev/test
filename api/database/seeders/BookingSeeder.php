<?php

namespace Database\Seeders;

use Database\Factories\BookingFactory;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        (new BookingFactory)
            ->count(50)
            ->create();
    }
}
