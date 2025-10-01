<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discharge>
 */
class DischargeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'discharge_date' => fake()->dateTime(),
            'condition_at_discharge' => fake()->text(),
            'instructions' => fake()->realText(),
            'admission_id' => fake()->numberBetween(1, 50),
        ];
    }
}
