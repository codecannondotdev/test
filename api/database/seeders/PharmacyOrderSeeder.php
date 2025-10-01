<?php

namespace Database\Seeders;

use Database\Factories\PharmacyOrderFactory;
use Illuminate\Database\Seeder;

class PharmacyOrderSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new PharmacyOrderFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
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
