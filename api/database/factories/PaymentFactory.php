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
            'payment_date' => fake()->date(),
            'payment_method' => fake()->randomElement(['CREDIT CARD', 'CASH', 'BANK TRANSFER']),
            'note' => fake()->realText(),
            'member_id' => fake()->numberBetween(1, 50),
            'subscription_id' => fake()->numberBetween(1, 50),
        ];
    }
}
