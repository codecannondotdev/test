<?php

namespace Database\Seeders;

use Database\Factories\PermissionFactory;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new PermissionFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->roles()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
