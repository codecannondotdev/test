<?php

namespace Database\Seeders;

use Database\Factories\LedgerAccountFactory;
use Illuminate\Database\Seeder;

class LedgerAccountSeeder extends Seeder
{
    public function run(): void
    {
        (new LedgerAccountFactory)
            ->count(50)
            ->create();
    }
}
