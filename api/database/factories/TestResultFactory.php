<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TestResult>
 */
class TestResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'result_value' => fake()->text(),
            'units' => fake()->randomNumber(9),
            'reference_range' => fake()->word(),
            'reported_at' => fake()->dateTimeThisDecade(),
            'lab_test_id' => fake()->numberBetween(1, 50),
            'specimen_id' => fake()->numberBetween(1, 50),
        ];
    }
}
