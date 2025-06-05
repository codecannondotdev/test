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
            'shipment_number' => fake()->uuid(),
            'shipment_date' => fake()->date(),
            'quantity_shipped' => fake()->randomNumber(9),
            'destination' => fake()->address(),
            'status' => fake()->randomElement(['PENDING', 'IN TRANSIT', 'DELIVERED']),
            'carrier' => fake()->company(),
            'sales_order_id' => fake()->numberBetween(1, 50),
        ];
    }
}
