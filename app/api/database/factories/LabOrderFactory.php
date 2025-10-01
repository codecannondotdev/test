<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabOrder>
 */
class LabOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_date' => fake()->dateTimeThisYear(),
            'priority' => fake()->randomElement(['Routine', 'Urgent', 'Stat']),
            'status' => fake()->randomElement(['Ordered', 'Collected', 'Completed']),
            'patient_id' => fake()->numberBetween(1, 50),
            'ordered_by_id' => fake()->numberBetween(1, 50),
        ];
    }
}
