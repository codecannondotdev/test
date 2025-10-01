<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PhysicalTherapySession>
 */
class PhysicalTherapySessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_date' => fake()->date(),
            'duration_minutes' => fake()->randomNumber(9),
            'therapist_notes' => fake()->realText(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
