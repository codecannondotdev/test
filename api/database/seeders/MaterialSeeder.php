<?php

namespace Database\Seeders;

use Database\Factories\MaterialFactory;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new MaterialFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->suppliers()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
