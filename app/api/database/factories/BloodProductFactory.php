<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BloodProduct>
 */
class BloodProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_type' => fake()->randomElement(['Whole Blood', 'PRBC', 'Platelets', 'Plasma']),
            'storage_temperature' => fake()->word(),
            'shelf_life_days' => fake()->randomNumber(9),
        ];
    }
}
