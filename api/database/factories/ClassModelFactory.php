<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClassModel>
 */
class ClassModelFactory extends Factory
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
            'description' => fake()->realText(),
            'difficulty_level' => fake()->randomElement(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
            'duration' => fake()->time(),
            'trainer_id' => fake()->numberBetween(1, 50),
        ];
    }
}
