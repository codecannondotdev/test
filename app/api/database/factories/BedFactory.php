<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bed>
 */
class BedFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bed_number' => fake()->randomNumber(9),
            'type' => fake()->randomElement(['REGULAR', 'ICU', 'PEDIATRIC']),
            'status' => fake()->randomElement(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']),
            'ward_id' => fake()->numberBetween(1, 50),
        ];
    }
}
