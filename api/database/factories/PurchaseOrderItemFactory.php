<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseOrderItem>
 */
class PurchaseOrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'item_description' => fake()->realText(),
            'quantity' => fake()->randomNumber(9),
            'unit_cost' => fake()->randomFloat(2, 8),
            'product_id' => fake()->numberBetween(1, 50),
            'purchase_order_id' => fake()->numberBetween(1, 50),
        ];
    }
}
