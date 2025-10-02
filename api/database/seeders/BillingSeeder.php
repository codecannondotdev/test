<?php

namespace Database\Seeders;

use Database\Factories\BillingFactory;
use Illuminate\Database\Seeder;

class BillingSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new BillingFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->treatments()->attach($this->getRandomIdArray());
            $entity->medications()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
