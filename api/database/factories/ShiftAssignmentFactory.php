<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShiftAssignment>
 */
class ShiftAssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assignment_date' => fake()->date(),
            'role' => fake()->jobTitle(),
            'notes' => fake()->text(),
            'nurse_id' => fake()->numberBetween(1, 50),
            'shift_id' => fake()->numberBetween(1, 50),
            'schedule_id' => fake()->numberBetween(1, 50),
        ];
    }
}
