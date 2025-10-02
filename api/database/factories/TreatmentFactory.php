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
            'outcome' => fake()->randomElement(['ONGOING', 'RESOLVED', 'IMPROVED', 'NO CHANGE', 'WORSENED']),
            'notes' => fake()->realText(),
            'patient_id' => fake()->numberBetween(1, 50),
            'doctor_id' => fake()->numberBetween(1, 50),
            'appointment_id' => fake()->numberBetween(1, 50),
        ];
    }
}
