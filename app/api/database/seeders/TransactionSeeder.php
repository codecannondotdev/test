<?php

namespace Database\Seeders;

use Database\Factories\TransactionFactory;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new TransactionFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->order()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
