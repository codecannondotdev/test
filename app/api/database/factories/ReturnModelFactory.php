<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnModel>
 */
class ReturnModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'return_date' => fake()->date(),
            'reason' => fake()->realText(),
            'condition' => fake()->text(),
            'customer_id' => fake()->numberBetween(1, 50),
            'order_id' => fake()->numberBetween(1, 50),
        ];
    }
}
