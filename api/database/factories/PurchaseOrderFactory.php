<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseOrder>
 */
class PurchaseOrderFactory extends Factory
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
            'quantity_ordered' => fake()->randomNumber(9),
            'unit_price' => fake()->randomFloat(2, 8),
            'total_cost' => fake()->randomFloat(2, 8),
            'material_id' => fake()->numberBetween(1, 50),
            'supplier_id' => fake()->numberBetween(1, 50),
            'status' => fake()->randomElement(['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED']),
        ];
    }
}
