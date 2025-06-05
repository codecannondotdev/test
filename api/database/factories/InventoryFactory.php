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
            'inventory_type' => fake()->randomElement(['RAW MATERIAL', 'FINISHED PRODUCT']),
            'item_name' => fake()->word(),
            'quantity_on_hand' => fake()->randomNumber(9),
            'location' => fake()->address(),
            'last_updated' => fake()->date(),
            'material_id' => fake()->numberBetween(1, 50),
            'car_model_id' => fake()->numberBetween(1, 50),
        ];
    }
}
