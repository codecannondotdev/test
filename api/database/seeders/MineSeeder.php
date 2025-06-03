<?php

namespace Database\Seeders;

use App\Models\Mine;
use Illuminate\Database\Seeder;

class MineSeeder extends Seeder
{
    public function run(): void
    {
        Mine::factory()
            ->count(50)
            ->create();
    }
}
