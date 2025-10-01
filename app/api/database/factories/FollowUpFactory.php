<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FollowUp>
 */
class FollowUpFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'follow_up_interval' => fake()->word(),
            'instructions' => fake()->text(),
            'appointment_id' => fake()->numberBetween(1, 50),
            'screening_id' => fake()->numberBetween(1, 50),
        ];
    }
}
