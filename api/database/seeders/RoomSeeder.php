<?php

namespace Database\Seeders;

use Database\Factories\RoomFactory;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new RoomFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->wards()->attach($this->getRandomIdArray());
            $entity->schedules()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
