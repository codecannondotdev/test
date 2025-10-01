<?php

namespace Database\Seeders;

use Database\Factories\ImmunizationFactory;
use Illuminate\Database\Seeder;

class ImmunizationSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new ImmunizationFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->patients()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
