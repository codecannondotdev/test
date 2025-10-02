<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Billing>
 */
class BillingFactory extends Factory
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
            'billing_date' => fake()->date(),
            'total_amount' => fake()->randomNumber(9),
            'status' => fake()->randomElement(['PENDING', 'BILLED', 'PAID', 'PARTIALLY_PAID', 'DENIED', 'REFUNDED']),
            'payment_method' => fake()->randomElement(['CASH', 'CARD', 'INSURANCE', 'ELECTRONIC_TRANSFER']),
            'insurance_claim_number' => fake()->randomNumber(9),
            'notes' => fake()->paragraph(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
