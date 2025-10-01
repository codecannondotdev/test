<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StaffCredential>
 */
class StaffCredentialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => fake()->word(),
            'number' => fake()->randomNumber(9),
            'issued_date' => fake()->date(),
            'expiry_date' => fake()->date(),
        ];
    }
}
