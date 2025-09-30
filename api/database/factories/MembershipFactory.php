<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Membership>
 */
class MembershipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'plan_name' => fake()->word(),
            'price' => fake()->randomFloat(2, 8),
            'duration_months' => fake()->randomNumber(9),
            'benefits' => fake()->paragraph(),
            'member_id' => fake()->numberBetween(1, 50),
        ];
    }
}
