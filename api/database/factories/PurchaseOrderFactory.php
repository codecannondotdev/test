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
            'order_date' => fake()->date(),
            'expected_delivery' => fake()->date(),
            'status' => fake()->word(),
            'total_amount' => fake()->randomFloat(2, 8),
            'supplier_id' => fake()->numberBetween(1, 50),
        ];
    }
}
