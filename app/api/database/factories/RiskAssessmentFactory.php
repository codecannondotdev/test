<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RiskAssessment>
 */
class RiskAssessmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tool_name' => fake()->name(),
            'score' => fake()->randomFloat(2, 8),
            'assessment_date' => fake()->date(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
