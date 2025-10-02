<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
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
            'floor' => fake()->randomNumber(9),
            'phone_extension' => fake()->randomDigit(),
            'description' => fake()->realText(),
            'head_doctor_id' => fake()->numberBetween(1, 50),
        ];
    }
}
