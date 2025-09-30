<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
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
            'stock_quantity' => fake()->randomNumber(9),
            'reorder_level' => fake()->randomDigitNotNull(),
            'last_updated' => fake()->date(),
            'product_id' => fake()->numberBetween(1, 50),
            'warehouse_id' => fake()->numberBetween(1, 50),
        ];
    }
}
