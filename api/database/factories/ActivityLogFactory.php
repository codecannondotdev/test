<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ActivityLog>
 */
class ActivityLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'action' => fake()->sentence(),
            'timestamp' => fake()->dateTimeThisYear(),
            'details' => fake()->text(),
            'related_model_id' => fake()->numberBetween(1, 50),
        ];
    }
}
