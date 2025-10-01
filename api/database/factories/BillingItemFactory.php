<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillingItem>
 */
class BillingItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => fake()->sentence(),
            'quantity' => fake()->randomNumber(9),
            'unit_price' => fake()->randomFloat(2, 8),
            'total_price' => fake()->randomFloat(2, 8),
            'invoice_id' => fake()->numberBetween(1, 50),
            'tax_rate_id' => fake()->numberBetween(1, 50),
        ];
    }
}
