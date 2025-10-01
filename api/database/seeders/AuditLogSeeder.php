<?php

namespace Database\Seeders;

use Database\Factories\AuditLogFactory;
use Illuminate\Database\Seeder;

class AuditLogSeeder extends Seeder
{
    public function run(): void
    {
        (new AuditLogFactory)
            ->count(50)
            ->create();
    }
}
