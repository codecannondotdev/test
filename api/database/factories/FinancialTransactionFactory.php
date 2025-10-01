<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FinancialTransaction>
 */
class FinancialTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => fake()->date(),
            'amount' => fake()->randomFloat(2, 8),
            'description' => fake()->realText(),
            'ledger_account_id' => fake()->numberBetween(1, 50),
            'payment_id' => fake()->numberBetween(1, 50),
            'claim_adjustment_id' => fake()->numberBetween(1, 50),
        ];
    }
}
