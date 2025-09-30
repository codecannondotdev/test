<?php

namespace Database\Seeders;

use Database\Factories\AsdfasdfasdFactory;
use Illuminate\Database\Seeder;

class AsdfasdfasdSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new AsdfasdfasdFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->attendedClasses()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
