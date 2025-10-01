<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Anesthesia>
 */
class AnesthesiaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement(['General', 'Regional', 'Local']),
            'start_time' => fake()->dateTime(),
            'end_time' => fake()->dateTimeThisYear(),
            'complications' => fake()->text(),
            'anesthesiologist_id' => fake()->numberBetween(1, 50),
            'surgery_id' => fake()->numberBetween(1, 50),
        ];
    }
}
