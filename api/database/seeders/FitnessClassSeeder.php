<?php

namespace Database\Seeders;

use Database\Factories\FitnessClassFactory;
use Illuminate\Database\Seeder;

class FitnessClassSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new FitnessClassFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->attendees()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
