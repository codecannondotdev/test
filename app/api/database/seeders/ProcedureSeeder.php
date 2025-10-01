<?php

namespace Database\Seeders;

use Database\Factories\ProcedureFactory;
use Illuminate\Database\Seeder;

class ProcedureSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new ProcedureFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->surgeries()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
