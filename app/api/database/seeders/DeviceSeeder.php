<?php

namespace Database\Seeders;

use Database\Factories\DeviceFactory;
use Illuminate\Database\Seeder;

class DeviceSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new DeviceFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->locations()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
