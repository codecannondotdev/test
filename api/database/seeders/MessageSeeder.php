<?php

namespace Database\Seeders;

use Database\Factories\MessageFactory;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        (new MessageFactory)
            ->count(50)
            ->create();
    }
}
