<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'day' => fake()->dayOfWeek(),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'class_id' => fake()->numberBetween(1, 50),
            'studio_id' => fake()->numberBetween(1, 50),
        ];
    }
}
