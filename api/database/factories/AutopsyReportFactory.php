<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AutopsyReport>
 */
class AutopsyReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'findings' => fake()->text(),
            'conclusion' => fake()->realText(),
            'report_date' => fake()->date(),
            'mortality_report_id' => fake()->numberBetween(1, 50),
        ];
    }
}
