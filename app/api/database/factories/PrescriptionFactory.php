<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prescription>
 */
class PrescriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dose' => fake()->randomNumber(9),
            'frequency' => fake()->word(),
            'duration' => fake()->word(),
            'instructions' => fake()->text(),
            'patient_id' => fake()->numberBetween(1, 50),
            'prescriber_id' => fake()->numberBetween(1, 50),
            'medication_id' => fake()->numberBetween(1, 50),
        ];
    }
}
