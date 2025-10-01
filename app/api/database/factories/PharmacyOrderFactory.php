<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PharmacyOrder>
 */
class PharmacyOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_date' => fake()->dateTime(),
            'status' => fake()->randomElement(['PENDING', 'FULFILLED', 'CANCELLED']),
            'pickup_location' => fake()->city(),
            'prescription_id' => fake()->numberBetween(1, 50),
        ];
    }
}
