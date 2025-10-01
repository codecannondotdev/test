<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Nurse>
 */
class NurseFactory extends Factory
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
            'license_number' => fake()->randomNumber(9),
            'shift_type' => fake()->randomElement(['DAY', 'NIGHT', 'ROTATING']),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->email(),
        ];
    }
}
