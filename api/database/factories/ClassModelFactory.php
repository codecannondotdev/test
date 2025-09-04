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
            'title' => fake()->title(),
            'description' => fake()->realText(),
            'class_date' => fake()->date(),
            'capacity' => fake()->randomNumber(9),
            'program_id' => fake()->numberBetween(1, 50),
            'instructor_id' => fake()->numberBetween(1, 50),
        ];
    }
}
