<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'specialty' => fake()->word(),
            'license_number' => fake()->creditCardNumber(),
            'contact_number' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'notes' => fake()->realText(),
            'department_id' => fake()->numberBetween(1, 50),
        ];
    }
}
