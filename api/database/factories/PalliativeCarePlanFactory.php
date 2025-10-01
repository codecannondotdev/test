<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PalliativeCarePlan>
 */
class PalliativeCarePlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'goals' => fake()->text(),
            'medications' => fake()->text(),
            'advance_directives' => fake()->text(),
            'patient_id' => fake()->numberBetween(1, 50),
            'care_team_id' => fake()->numberBetween(1, 50),
        ];
    }
}
