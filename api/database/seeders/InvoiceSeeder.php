<?php

namespace Database\Seeders;

use Database\Factories\InvoiceFactory;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    public function run(): void
    {
        (new InvoiceFactory)
            ->count(50)
            ->create();
    }
}
