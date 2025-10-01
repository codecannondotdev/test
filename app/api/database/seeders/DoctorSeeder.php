<?php

namespace Database\Seeders;

use Database\Factories\DoctorFactory;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new DoctorFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->departments()->attach($this->getRandomIdArray());
            $entity->surgeries()->attach($this->getRandomIdArray());
            $entity->specialties()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
