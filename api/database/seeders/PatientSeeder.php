<?php

namespace Database\Seeders;

use Database\Factories\PatientFactory;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $entities = (new PatientFactory)
            ->count(50)
            ->create();

        foreach ($entities as $entity) {
            $entity->insurances()->attach($this->getRandomIdArray());
            $entity->careTeam()->attach($this->getRandomIdArray());
            $entity->clinicalTrials()->attach($this->getRandomIdArray());
            $entity->researchStudies()->attach($this->getRandomIdArray());
            $entity->caseManager()->attach($this->getRandomIdArray());
            $entity->immunizations()->attach($this->getRandomIdArray());
        }
    }

    private function getRandomIdArray()
    {
        $ids = range(1, 50);
        shuffle($ids);

        return array_slice($ids, 0, rand(1, 8));
    }
}
