<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FamilyContact>
 */
class FamilyContactFactory extends Factory
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
            'relationship' => fake()->word(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'patient_id' => fake()->numberBetween(1, 50),
        ];
    }
}
