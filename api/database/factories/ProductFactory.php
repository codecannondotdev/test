<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(5, true),
            'weight' => fake()->randomFloat(2, 8),
            'price' => fake()->randomFloat(2, 8),
            'description' => fake()->realText(),
            'dimensions' => fake()->realText(),
            'category_id' => fake()->numberBetween(1, 50),
            'supplier_id' => fake()->numberBetween(1, 50),
        ];
    }
}
