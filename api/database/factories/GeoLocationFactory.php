<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GeoLocation>
 */
class GeoLocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'latitude' => fake()->randomFloat(2, 8),
            'longitude' => fake()->randomFloat(2, 8),
            'description' => fake()->sentence(),
            'facility_id' => fake()->numberBetween(1, 50),
        ];
    }
}
