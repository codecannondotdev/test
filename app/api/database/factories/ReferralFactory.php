<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Referral>
 */
class ReferralFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'referral_source' => fake()->word(),
            'reason' => fake()->paragraph(),
            'date' => fake()->date(),
            'patient_id' => fake()->numberBetween(1, 50),
            'referring_provider_id' => fake()->numberBetween(1, 50),
            'receiving_provider_id' => fake()->numberBetween(1, 50),
            'referral_source_id' => fake()->numberBetween(1, 50),
        ];
    }
}
