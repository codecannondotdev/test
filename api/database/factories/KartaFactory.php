<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Karta>
 */
class KartaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ime' => fake()->sentence(),
            'oceno' => fake()->sentence(),
            'edition' => fake()->sentence(),
            'card_number' => fake()->sentence(),
            'condition' => fake()->sentence(),
            'predal_id' => fake()->numberBetween(1, 50),
        ];
    }
}
