<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarModel>
 */
class CarModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model_name' => fake()->word(),
            'engine_type' => fake()->randomElement(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
            'features' => fake()->realText(),
            'base_price' => fake()->randomFloat(2, 8),
        ];
    }
}
