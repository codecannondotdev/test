<?php

namespace Database\Seeders;

use Database\Factories\SurgeryFactory;
use Illuminate\Database\Seeder;

class SurgerySeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new SurgeryFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->surgeons()->attach($this->getRandomIdArray());
            $entity->procedures()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
