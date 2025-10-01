<?php

namespace Database\Seeders;

use Database\Factories\ResearchStudyFactory;
use Illuminate\Database\Seeder;

class ResearchStudySeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new ResearchStudyFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->participants()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
