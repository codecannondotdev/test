<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GrowthChart>
 */
class GrowthChartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'measurement_date' => fake()->date(),
            'weight' => fake()->randomFloat(2, 8),
            'height' => fake()->randomFloat(2, 8),
            'head_circumference' => fake()->randomFloat(2, 8),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
