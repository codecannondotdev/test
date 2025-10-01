<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainingRecord>
 */
class TrainingRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_name' => fake()->word(),
            'completion_date' => fake()->date(),
            'status' => fake()->randomElement(['COMPLETED', 'IN_PROGRESS', 'OVERDUE']),
            'nurse_id' => fake()->numberBetween(1, 50),
            'certification_id' => fake()->numberBetween(1, 50),
        ];
    }
}
