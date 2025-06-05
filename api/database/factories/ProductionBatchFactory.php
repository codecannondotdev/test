<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductionBatch>
 */
class ProductionBatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'batch_identifier' => fake()->uuid(),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'quantity_produced' => fake()->randomNumber(9),
            'notes' => fake()->realText(),
            'factory_id' => fake()->numberBetween(1, 50),
            'car_model_id' => fake()->numberBetween(1, 50),
        ];
    }
}
