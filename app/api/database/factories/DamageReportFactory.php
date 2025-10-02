<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DamageReport>
 */
class DamageReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'report_date' => fake()->date(),
            'description' => fake()->realText(),
            'severity' => fake()->randomElement(['MINOR', 'MAJOR', 'CRITICAL']),
            'employee_id' => fake()->numberBetween(1, 50),
        ];
    }
}
