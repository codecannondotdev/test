<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FitnessClass>
 */
class FitnessClassFactory extends Factory
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
            'description' => fake()->paragraph(),
            'schedule' => fake()->dateTime(),
            'duration_minutes' => fake()->randomNumber(9),
            'trainer_id' => fake()->numberBetween(1, 50),
        ];
    }
}
