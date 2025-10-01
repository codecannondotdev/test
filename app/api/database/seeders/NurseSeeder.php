<?php

namespace Database\Seeders;

use Database\Factories\NurseFactory;
use Illuminate\Database\Seeder;

class NurseSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new NurseFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->departments()->attach($this->getRandomIdArray());
            $entity->wards()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
