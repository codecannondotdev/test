<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LedgerAccount>
 */
class LedgerAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_number' => fake()->randomNumber(9),
            'name' => fake()->name(),
            'type' => fake()->randomElement(['Asset', 'Liability', 'Revenue', 'Expense', 'Equity']),
        ];
    }
}
