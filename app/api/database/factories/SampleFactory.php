<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sample>
 */
class SampleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sample_type' => fake()->word(),
            'collection_time' => fake()->dateTime(),
            'condition' => fake()->word(),
            'specimen_id' => fake()->numberBetween(1, 50),
        ];
    }
}
