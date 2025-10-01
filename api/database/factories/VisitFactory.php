<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Visit>
 */
class VisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visit_type' => fake()->randomElement(['OUTPATIENT', 'INPATIENT', 'EMERGENCY']),
            'start_date_time' => fake()->dateTime(),
            'end_date_time' => fake()->dateTimeThisYear(),
            'reason' => fake()->realText(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
