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
            'payment_date' => fake()->date(),
            'amount' => fake()->randomFloat(2, 8),
            'payment_method' => fake()->creditCardType(),
            'customer_id' => fake()->numberBetween(1, 50),
            'order_id' => fake()->numberBetween(1, 50),
        ];
    }
}
