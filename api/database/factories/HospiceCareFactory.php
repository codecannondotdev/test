<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HospiceCare>
 */
class HospiceCareFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'start_date' => fake()->date(),
            'plan_summary' => fake()->realText(),
            'status' => fake()->randomElement(['Active', 'Completed']),
            'patient_id' => fake()->numberBetween(1, 50),
            'care_team_id' => fake()->numberBetween(1, 50),
        ];
    }
}
