<?php

namespace Database\Seeders;

use Database\Factories\OrderFactory;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new OrderFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->transactions()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
