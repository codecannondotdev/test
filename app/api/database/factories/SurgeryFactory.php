<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Surgery>
 */
class SurgeryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'procedure_name' => fake()->name(),
            'scheduled_start' => fake()->dateTime(),
            'scheduled_end' => fake()->dateTimeThisYear(),
            'status' => fake()->randomElement(['SCHEDULED', 'COMPLETED', 'CANCELLED']),
            'patient_id' => fake()->numberBetween(1, 50),
            'operating_room_id' => fake()->numberBetween(1, 50),
        ];
    }
}
