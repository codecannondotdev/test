<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RadiologyReport>
 */
class RadiologyReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'study_type' => fake()->word(),
            'findings' => fake()->realText(),
            'impression' => fake()->realText(),
            'report_date' => fake()->date(),
            'patient_id' => fake()->numberBetween(1, 50),
            'imaging_study_id' => fake()->numberBetween(1, 50),
        ];
    }
}
