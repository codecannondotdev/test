<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Session>
 */
class SessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => fake()->date(),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'capacity' => fake()->randomNumber(9),
            'trainer_id' => fake()->numberBetween(1, 50),
            'fitness_class_id' => fake()->numberBetween(1, 50),
            'schedule_id' => fake()->numberBetween(1, 50),
            'facility_id' => fake()->numberBetween(1, 50),
        ];
    }
}
