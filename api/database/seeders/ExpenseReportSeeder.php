<?php

namespace Database\Seeders;

use Database\Factories\ExpenseReportFactory;
use Illuminate\Database\Seeder;

class ExpenseReportSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new ExpenseReportFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->reportedExpenses()->attach($this->getRandomIdArray());
            $entity->expenses()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
