<?php

namespace Database\Seeders;

use Database\Factories\DepartmentFactory;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new DepartmentFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->doctors()->attach($this->getRandomIdArray());
            $entity->nurses()->attach($this->getRandomIdArray());
            $entity->specialties()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
