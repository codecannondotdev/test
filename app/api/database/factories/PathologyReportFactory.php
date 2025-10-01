<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PathologyReport>
 */
class PathologyReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'specimen_description' => fake()->text(),
            'findings' => fake()->realText(),
            'report_date' => fake()->date(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
