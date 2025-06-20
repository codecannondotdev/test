<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipment>
 */
class EquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'description' => fake()->realText(),
            'status' => fake()->randomElement(['AVAILABLE', 'IN USE', 'MAINTENANCE']),
            'facility_id' => fake()->numberBetween(1, 50),
        ];
    }
}
