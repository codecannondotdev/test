<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Budget>
 */
class BudgetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'amount' => fake()->randomFloat(2, 8),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'alert_threshold' => fake()->randomFloat(2, 8),
            'notes' => fake()->realText(),
            'category_id' => fake()->numberBetween(1, 50),
        ];
    }
}
