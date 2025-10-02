<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'item_name' => fake()->words(5, true),
            'quantity' => fake()->randomDigitNotNull(),
            'unit_price' => fake()->randomFloat(2, 8),
            'product_id' => fake()->numberBetween(1, 50),
            'order_id' => fake()->numberBetween(1, 50),
        ];
    }
}
