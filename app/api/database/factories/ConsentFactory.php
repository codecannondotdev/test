<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Consent>
 */
class ConsentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'consent_type' => fake()->word(),
            'granted' => fake()->boolean(),
            'granted_at' => fake()->dateTime(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
