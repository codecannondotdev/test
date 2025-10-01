<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DietOrder>
 */
class DietOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'meal_type' => fake()->randomElement(['Breakfast', 'Lunch', 'Dinner', 'Snack']),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'patient_id' => fake()->numberBetween(1, 50),
            'nutritional_plan_id' => fake()->numberBetween(1, 50),
        ];
    }
}
