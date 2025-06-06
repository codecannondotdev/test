<?php

namespace Database\Seeders;

use Database\Factories\SupplierFactory;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new SupplierFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->materials()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
