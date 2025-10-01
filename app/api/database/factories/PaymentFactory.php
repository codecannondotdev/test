<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'amount' => fake()->randomFloat(2, 8),
            'date' => fake()->date(),
            'method' => fake()->randomElement(['Cash', 'Card', 'Check', 'Insurance', 'Online']),
            'reference' => fake()->uuid(),
            'billing_account_id' => fake()->numberBetween(1, 50),
            'invoice_id' => fake()->numberBetween(1, 50),
            'payment_method_id' => fake()->numberBetween(1, 50),
            'currency_id' => fake()->numberBetween(1, 50),
        ];
    }
}
