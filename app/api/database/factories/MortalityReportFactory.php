<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MortalityReport>
 */
class MortalityReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date_of_death' => fake()->date(),
            'cause' => fake()->sentence(),
            'reviewed_by' => fake()->name(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
