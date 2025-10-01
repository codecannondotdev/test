<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProcurementOrder>
 */
class ProcurementOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_number' => fake()->word(),
            'order_date' => fake()->date(),
            'status' => fake()->randomElement(['Ordered', 'Received', 'Cancelled']),
            'stock_id' => fake()->numberBetween(1, 50),
            'supplier_id' => fake()->numberBetween(1, 50),
            'donor_id' => fake()->numberBetween(1, 50),
        ];
    }
}
