<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OccupationalTherapySession>
 */
class OccupationalTherapySessionFactory extends Factory
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
            'goals' => fake()->paragraphs(5, true),
            'outcome' => fake()->text(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
