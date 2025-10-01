<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Treatment>
 */
class TreatmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'description' => fake()->realText(),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'status' => fake()->randomElement(['PLANNED', 'ACTIVE', 'COMPLETED', 'INTERRUPTED']),
            'patient_id' => fake()->numberBetween(1, 50),
            'supervising_doctor_id' => fake()->numberBetween(1, 50),
            'care_plan_id' => fake()->numberBetween(1, 50),
            'diagnosis_id' => fake()->numberBetween(1, 50),
        ];
    }
}
