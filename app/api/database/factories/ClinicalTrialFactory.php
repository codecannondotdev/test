<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClinicalTrial>
 */
class ClinicalTrialFactory extends Factory
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
            'phase' => fake()->word(),
            'status' => fake()->randomElement(['Recruiting', 'Active', 'Closed']),
            'research_study_id' => fake()->numberBetween(1, 50),
        ];
    }
}
