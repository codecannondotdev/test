<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transfusion>
 */
class TransfusionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'transfusion_date' => fake()->dateTime(),
            'volume' => fake()->randomNumber(9),
            'reaction_observed' => fake()->text(),
            'patient_id' => fake()->numberBetween(1, 50),
            'blood_bank_id' => fake()->numberBetween(1, 50),
            'blood_product_id' => fake()->numberBetween(1, 50),
        ];
    }
}
