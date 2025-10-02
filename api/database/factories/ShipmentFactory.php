<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'shipment_date' => fake()->date(),
            'carrier' => fake()->company(),
            'tracking_number' => fake()->uuid(),
            'order_id' => fake()->numberBetween(1, 50),
            'warehouse_id' => fake()->numberBetween(1, 50),
            'shipping_method_id' => fake()->numberBetween(1, 50),
        ];
    }
}
