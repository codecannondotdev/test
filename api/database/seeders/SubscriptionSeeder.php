<?php

namespace Database\Seeders;

use Database\Factories\SubscriptionFactory;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        (new SubscriptionFactory)
            ->count(50)
            ->create();
    }
}
