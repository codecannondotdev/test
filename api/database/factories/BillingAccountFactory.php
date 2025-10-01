<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillingAccount>
 */
class BillingAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_number' => fake()->creditCardNumber(),
            'status' => fake()->randomElement(['Active', 'Closed', 'Suspended']),
            'balance' => fake()->randomFloat(2, 8),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
