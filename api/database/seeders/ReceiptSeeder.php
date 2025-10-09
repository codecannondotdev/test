<?php

namespace Database\Seeders;

use Database\Factories\ReceiptFactory;
use Illuminate\Database\Seeder;

class ReceiptSeeder extends Seeder
{
    public function run(): void
    {
        (new ReceiptFactory)
            ->count(50)
            ->create();
    }
}
