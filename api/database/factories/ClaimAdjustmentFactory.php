<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClaimAdjustment>
 */
class ClaimAdjustmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'adjustment_code' => fake()->word(),
            'amount_adjusted' => fake()->randomFloat(2, 8),
            'reason' => fake()->text(),
            'insurance_claim_id' => fake()->numberBetween(1, 50),
        ];
    }
}
