<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TelemedicineSession>
 */
class TelemedicineSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'platform' => fake()->word(),
            'session_link' => fake()->url(),
            'start_time' => fake()->dateTimeThisYear(),
            'end_time' => fake()->dateTime(),
            'appointment_id' => fake()->numberBetween(1, 50),
        ];
    }
}
