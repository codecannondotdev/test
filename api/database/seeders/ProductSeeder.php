<?php

namespace Database\Seeders;

use Database\Factories\ProductFactory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new ProductFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->damageReports()->attach($this->getRandomIdArray());
            $entity->returns()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
