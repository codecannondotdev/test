<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'invoice_number' => fake()->randomNumber(9),
            'issue_date' => fake()->date(),
            'due_date' => fake()->date(),
            'total_amount' => fake()->randomFloat(2, 8),
            'status' => fake()->randomElement(['DRAFT', 'ISSUED', 'PAID', 'PARTIALLY PAID', 'VOIDED']),
            'billing_account_id' => fake()->numberBetween(1, 50),
            'insurance_claim_id' => fake()->numberBetween(1, 50),
            'currency_id' => fake()->numberBetween(1, 50),
            'tax_rate_id' => fake()->numberBetween(1, 50),
        ];
    }
}
