<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VaccineRecord>
 */
class VaccineRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vaccine_name' => fake()->word(),
            'date_administered' => fake()->date(),
            'dose_number' => fake()->randomDigitNotNull(),
            'patient_id' => fake()->numberBetween(1, 50),
            'immunization_id' => fake()->numberBetween(1, 50),
        ];
    }
}
