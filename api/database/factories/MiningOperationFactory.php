<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MiningOperation>
 */
class MiningOperationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'extraction_date' => fake()->date(),
            'quantity_extracted' => fake()->randomFloat(2, 8),
            'notes' => fake()->realText(),
            'material_id' => fake()->numberBetween(1, 50),
            'mine_id' => fake()->numberBetween(1, 50),
        ];
    }
}
