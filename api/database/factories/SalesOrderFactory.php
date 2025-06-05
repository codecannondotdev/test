<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesOrder>
 */
class SalesOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_number' => fake()->randomNumber(9),
            'order_date' => fake()->date(),
            'quantity' => fake()->randomDigitNotNull(),
            'unit_price' => fake()->randomFloat(2, 8),
            'total_amount' => fake()->randomFloat(2, 8),
            'car_model_id' => fake()->numberBetween(1, 50),
            'customer_id' => fake()->numberBetween(1, 50),
            'status' => fake()->randomElement(['PENDING', 'CONFIRMED', 'SHIPPED', 'COMPLETED', 'CANCELLED']),
        ];
    }
}
