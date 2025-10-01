<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NutritionalPlan>
 */
class NutritionalPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'diet_type' => fake()->word(),
            'calorie_goal' => fake()->randomNumber(9),
            'notes' => fake()->text(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
