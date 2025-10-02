<?php

namespace Database\Seeders;

use Database\Factories\DamageReportFactory;
use Illuminate\Database\Seeder;

class DamageReportSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new DamageReportFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->product()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
