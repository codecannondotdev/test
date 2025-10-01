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
            'name' => fake()->word(),
            'formulation' => fake()->word(),
            'strength' => fake()->randomNumber(9),
            'route' => fake()->randomElement(['ORAL', 'IV', 'IM', 'SUBCUTANEOUS']),
            'indications' => fake()->text(),
        ];
    }
}
