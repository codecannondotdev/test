<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_number' => fake()->randomDigitNotNull(),
            'type' => fake()->randomElement(['Clinic', 'Operating', 'Recovery', 'Consultation']),
            'capacity' => fake()->randomNumber(9),
            'facility_id' => fake()->numberBetween(1, 50),
        ];
    }
}
