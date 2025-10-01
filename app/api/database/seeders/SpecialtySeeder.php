<?php

namespace Database\Seeders;

use Database\Factories\SpecialtyFactory;
use Illuminate\Database\Seeder;

class SpecialtySeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new SpecialtyFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->doctors()->attach($this->getRandomIdArray());
            $entity->departments()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
