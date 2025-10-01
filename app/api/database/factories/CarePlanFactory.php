<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarePlan>
 */
class CarePlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'goals' => fake()->text(),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'patient_id' => fake()->numberBetween(1, 50),
            'care_team_id' => fake()->numberBetween(1, 50),
            'case_manager_id' => fake()->numberBetween(1, 50),
        ];
    }
}
