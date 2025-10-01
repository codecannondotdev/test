<?php

namespace Database\Seeders;

use Database\Factories\WardFactory;
use Illuminate\Database\Seeder;

class WardSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new WardFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->nurses()->attach($this->getRandomIdArray());
            $entity->rooms()->attach($this->getRandomIdArray());
            $entity->devices()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
