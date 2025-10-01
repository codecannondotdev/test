<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InventoryItem>
 */
class InventoryItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'category' => fake()->word(),
            'quantity' => fake()->randomNumber(9),
            'reorder_level' => fake()->randomNumber(9),
            'medication_id' => fake()->numberBetween(1, 50),
            'supplier_id' => fake()->numberBetween(1, 50),
            'procurement_order_id' => fake()->numberBetween(1, 50),
        ];
    }
}
