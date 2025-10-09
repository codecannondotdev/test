<?php

namespace Database\Seeders;

use Database\Factories\ExpenseFactory;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new ExpenseFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->tags()->attach($this->getRandomIdArray());
            $entity->reports()->attach($this->getRandomIdArray());
            $entity->expenseReports()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
