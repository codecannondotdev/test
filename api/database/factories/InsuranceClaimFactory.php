<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InsuranceClaim>
 */
class InsuranceClaimFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'claim_number' => fake()->randomNumber(9),
            'submission_date' => fake()->date(),
            'status' => fake()->randomElement(['Submitted', 'Accepted', 'Rejected', 'Adjusted']),
            'billing_account_id' => fake()->numberBetween(1, 50),
            'insurance_id' => fake()->numberBetween(1, 50),
        ];
    }
}
