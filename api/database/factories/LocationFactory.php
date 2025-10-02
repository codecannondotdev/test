<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'aisle' => fake()->word(),
            'section' => fake()->word(),
            'shelf' => fake()->word(),
            'warehouse_id' => fake()->numberBetween(1, 50),
        ];
    }
}
