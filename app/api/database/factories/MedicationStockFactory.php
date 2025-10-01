<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicationStock>
 */
class MedicationStockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'batch_number' => fake()->randomNumber(9),
            'expiry_date' => fake()->date(),
            'quantity_available' => fake()->randomNumber(9),
        ];
    }
}
