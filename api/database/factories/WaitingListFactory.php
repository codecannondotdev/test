<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WaitingList>
 */
class WaitingListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'position' => fake()->randomNumber(9),
            'added_at' => fake()->dateTimeThisCentury(),
            'notes' => fake()->realText(),
            'patient_id' => fake()->numberBetween(1, 50),
            'appointment_id' => fake()->numberBetween(1, 50),
            'queue_id' => fake()->numberBetween(1, 50),
        ];
    }
}
