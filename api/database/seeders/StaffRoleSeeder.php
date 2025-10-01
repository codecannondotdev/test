<?php

namespace Database\Seeders;

use Database\Factories\StaffRoleFactory;
use Illuminate\Database\Seeder;

class StaffRoleSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new StaffRoleFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->shifts()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
