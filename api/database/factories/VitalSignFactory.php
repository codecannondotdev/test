<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VitalSign>
 */
class VitalSignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement(['TEMPERATURE', 'PULSE', 'BP', 'RESPIRATORY_RATE', 'SPO2']),
            'value' => fake()->randomFloat(2, 8),
            'recorded_at' => fake()->dateTimeThisYear(),
            'notes' => fake()->text(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
