<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LegalHold>
 */
class LegalHoldFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reason' => fake()->realText(),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
