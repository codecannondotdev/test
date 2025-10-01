<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Allergy>
 */
class AllergyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'allergen' => fake()->word(),
            'reaction' => fake()->word(),
            'severity' => fake()->randomElement(['Mild', 'Moderate', 'Severe']),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
