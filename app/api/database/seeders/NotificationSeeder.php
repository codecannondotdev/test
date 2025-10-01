<?php

namespace Database\Seeders;

use Database\Factories\NotificationFactory;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        (new NotificationFactory)
            ->count(50)
            ->create();
    }
}
