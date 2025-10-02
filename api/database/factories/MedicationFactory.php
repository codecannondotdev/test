<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medication>
 */
class MedicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'dosage_form' => fake()->word(),
            'strength' => fake()->randomDigit(),
            'administration_instructions' => fake()->realText(),
            'common_side_effects' => fake()->realText(),
            'precautions' => fake()->text(),
        ];
    }
}
